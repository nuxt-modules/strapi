import Vue from 'vue'
import Hookable from 'hookable'
import destr from 'destr'
import reqURL from 'requrl'
import { joinURL } from 'ufo'
import { NuxtHTTPInstance } from '@nuxt/http'
import { NuxtCookies } from 'cookie-universal-nuxt'
import type { StrapiOptions } from '../types'

const getExpirationDate = (ms: number) => new Date(Date.now() + ms)
const isExpired = (expires: Date | undefined) => {
  if (!expires) { return false }
  if (new Date(expires) <= new Date()) {
    return true
  }
  return false
}

export class Strapi extends Hookable {
  private state: { user: null | any }
  private useClientStorage: boolean
  private clientStorage: 'localStorage' | 'sessionStorage'
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
    this.clientStorage = this.options.session.expires === 'session' ? 'sessionStorage' : 'localStorage'
    this.useClientStorage = process.client && typeof window[this.clientStorage] !== 'undefined'

    this.syncToken()
    const url = runtimeConfig.url || '<%= options.url %>'
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
    const { data } = await this.$http.$post('/graphql', query)
    return data
  }

  getToken () {
    let token
    if (this.useClientStorage) {
      const session = destr(window[this.clientStorage].getItem(this.options.session.key))
      if (session && !isExpired(session.expires)) {
        token = session.token
      }
    }
    if (!token) {
      token = this.$cookies.get(this.options.session.key)
    }
    return token
  }

  setToken (token) {
    const expires = this.options.session.expires === 'session' ? undefined : getExpirationDate(this.options.session.expires)

    if (this.useClientStorage) {
      window[this.clientStorage].setItem(this.options.session.key, JSON.stringify({ token, expires }))
    }
    this.$cookies.set(this.options.session.key, token, {
      ...this.options.session.cookie,
      expires
    })
    this.$http.setToken(token, 'Bearer')
  }

  clearToken () {
    this.$http.setToken(false)
    if (this.useClientStorage) {
      window[this.clientStorage].removeItem(this.options.session.key)
    }
    this.$cookies.remove(this.options.session.key)
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
