import Vue from 'vue'
import Hookable from 'hookable'
import destr from 'destr'
import reqURL from 'requrl'
import { joinURL } from 'ufo'
import type { NuxtHTTPInstance } from '@nuxt/http'
import type { NuxtCookies } from 'cookie-universal-nuxt'
import type { StrapiOptions } from 'types'
import { getExpirationDate, isExpired } from './utils'

export class Strapi extends Hookable {
  private state: { user: null | any }
  private useClientStorage: boolean
  $cookies: NuxtCookies
  $http: NuxtHTTPInstance
  options: StrapiOptions
  constructor (ctx, options: StrapiOptions) {
    super()

    ctx.$config = ctx.$config || {} // fallback for Nuxt < 2.13
    const runtimeConfig = ctx.$config.strapi || {}
    this.$cookies = ctx.app.$cookies
    this.$http = ctx.$http.create({})
    this.options = options

    this.state = Vue.observable({ user: null })

    this.syncToken()
    const url = runtimeConfig.url
    if (process.server && ctx.req && url.startsWith('/')) {
      this.$http.setBaseURL(joinURL(reqURL(ctx.req), url))
    } else {
      this.$http.setBaseURL(url)
    }
    this.$http.onError((err) => {
      if (!err.response) {
        this.callHook('error', err)
        return
      }

      const { response: { data: { message: msg } } }: any = err

      let message
      if (Array.isArray(msg)) {
        message = msg[0].messages[0].message
      } else if (typeof msg === 'object' && msg !== null) {
        message = msg.message
      } else {
        message = msg
      }

      err.message = message;
      (err as any).original = (err.response as any).data
      this.callHook('error', err)
    })
  }

  get user () {
    return this.state.user
  }

  set user (user) {
    Vue.set(this.state, 'user', user)
  }

  async register (data) {
    this.clearToken()
    const { user, jwt } = await this.$http.$post<any>('/auth/local/register', data)
    this.setToken(jwt)
    this.setUser(user)
    return { user, jwt }
  }

  async login (data) {
    this.clearToken()
    const { user, jwt } = await this.$http.$post<any>('/auth/local', data)
    this.setToken(jwt)
    this.setUser(user)
    return { user, jwt }
  }

  forgotPassword (data) {
    this.clearToken()
    return this.$http.$post('/auth/forgot-password', data)
  }

  async resetPassword (data) {
    this.clearToken()
    const { user, jwt } = await this.$http.$post<any>('/auth/reset-password', data)
    this.setToken(jwt)
    this.setUser(user)
    return { user, jwt }
  }

  sendEmailConfirmation (data) {
    return this.$http.$post('/auth/send-email-confirmation', data)
  }

  logout () {
    this.setUser(null)
    this.clearToken()
  }

  async fetchUser () {
    const jwt = this.syncToken()
    if (!jwt) {
      return null
    }

    try {
      const user = await this.findOne('users', 'me')
      this.setUser(user)
    } catch (e) {
      this.clearToken()
    }

    return this.user
  }

  setUser (user) {
    this.user = user
    this.callHook('userUpdated', user)
  }

  find (entity, searchParams) {
    return this.$http.$get(`/${entity}`, { searchParams })
  }

  count (entity, searchParams) {
    return this.$http.$get(`/${entity}/count`, { searchParams })
  }

  findOne (entity, id) {
    return this.$http.$get(`/${entity}/${id}`)
  }

  create (entity, data) {
    return this.$http.$post(`/${entity}`, data)
  }

  update (entity, id, data) {
    if (typeof id === 'object') {
      data = id
      id = undefined
    }

    const path = [entity, id].filter(Boolean).join('/')
    return this.$http.$put(`/${path}`, data)
  }

  delete (entity, id) {
    const path = [entity, id].filter(Boolean).join('/')
    return this.$http.$delete(`/${path}`)
  }

  async graphql (query) {
    const { data } = await this.$http.$post('/graphql', query) as any
    return data
  }

  getClientStorage () {
    const storageType = this.options.expires === 'session' ? 'sessionStorage' : 'localStorage'

    if (process.client && typeof window[storageType] !== 'undefined') {
      return window[storageType]
    }
    return null
  }

  getToken () {
    let token
    const clientStorage = this.getClientStorage()
    if (clientStorage) {
      const session = destr(clientStorage.getItem(this.options.key))
      if (session && !isExpired(session.expires)) {
        token = session.token
      }
    }
    if (!token) {
      token = this.$cookies.get(this.options.key)
    }
    return token
  }

  setToken (token) {
    const expires = this.options.expires === 'session' ? undefined : getExpirationDate(this.options.expires)

    const clientStorage = this.getClientStorage()
    clientStorage && clientStorage.setItem(this.options.key, JSON.stringify({ token, expires }))
    this.$cookies.set(this.options.key, token, {
      ...this.options.cookie,
      expires
    })
    this.$http.setToken(token, 'Bearer')
  }

  clearToken () {
    this.$http.setToken(false)
    const clientStorage = this.getClientStorage()
    clientStorage && clientStorage.removeItem(this.options.key)
    this.$cookies.remove(this.options.key)
  }

  syncToken (jwt?) {
    if (!jwt) {
      jwt = this.getToken()
    }
    if (jwt) {
      this.setToken(jwt)
    } else {
      this.clearToken()
    }
    return jwt
  }
}
