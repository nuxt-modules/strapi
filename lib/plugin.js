import Vue from 'vue'
import Hookable from 'hookable'
import { isArray, isObject } from 'lodash'

const TOKEN_KEY = 'strapi_jwt'

class Strapi extends Hookable {
  constructor (ctx) {
    super()

    this.state = Vue.observable({ user: null })

    this.$cookies = ctx.app.$cookies
    this.$http = ctx.$http.create({})
    this.$http.setBaseURL('<%= options.url %>')
    this.$http.onError((err) => {
      const { response: { data: { message: msg } } } = err

      let message
      if (isArray(msg)) {
        message = msg[0].messages[0].message
      } else if (isObject(msg)) {
        message = msg.message
      } else {
        message = msg
      }

      err.message = message
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
    const { user, jwt } = await this.$http.$post('/auth/local/register', data)
    this.setToken(jwt)
    this.setUser(user)
    return { user, jwt }
  }

  async login (data) {
    this.clearToken()
    const { user, jwt } = await this.$http.$post('/auth/local', data)
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
    const { user, jwt } = await this.$http.$post('/auth/reset-password', data)
    this.setToken(jwt)
    this.setUser(user)
    return { user, jwt }
  }

  logout () {
    this.setUser(null)
    this.clearToken()
  }

  async fetchUser () {
    const jwt = this.getToken()
    if (!jwt) {
      return null
    }

    this.$http.setToken(jwt, 'Bearer')

    try {
      const user = await this.getEntry('users', 'me')
      this.setUser(user)
    } catch (e) {
      this.clearToken()
    }

    return this.user
  }

  setUser (user) {
    this.user = user
  }

  getEntries (contentTypePluralized, searchParams) {
    return this.$http.$get(`/${contentTypePluralized}`, { searchParams })
  }

  getEntryCount (contentType, searchParams) {
    return this.$http.$get(`/${contentType}/count`, { searchParams })
  }

  getEntry (contentTypePluralized, id) {
    return this.$http.$get(`/${contentTypePluralized}/${id}`)
  }

  createEntry (contentTypePluralized, data) {
    return this.$http.$post(`/${contentTypePluralized}`, data)
  }

  updateEntry (contentTypePluralized, id, data) {
    return this.$http.$put(`/${contentTypePluralized}/${id}`, data)
  }

  deleteEntry (contentTypePluralized, id) {
    return this.$http.$delete(`/${contentTypePluralized}/${id}`)
  }

  getToken () {
    return this.$cookies.get(TOKEN_KEY)
  }

  setToken (jwt) {
    this.$http.setToken(jwt, 'Bearer')
    this.$cookies.set(TOKEN_KEY, jwt)
  }

  clearToken () {
    this.$http.setToken(false)
    this.$cookies.remove(TOKEN_KEY)
  }
}

export default async function (ctx, inject) {
  <%= JSON.stringify(options.entities) %>.forEach((entity) => {
  Object.defineProperty(Strapi.prototype, `$${entity}`, {
    get: function () {
      const that = this
      return {
        find: function (...args) {
          return that.getEntries(entity, ...args)
        },
        findOne: function (...args) {
          return that.getEntry(entity, ...args)
        },
        count: function (...args) {
          return that.getEntryCount(entity, ...args)
        },
        create: function (...args) {
          return that.createEntry(entity, ...args)
        },
        update: function (...args) {
          return that.updateEntry(entity, ...args)
        },
        delete: function (...args) {
          return that.deleteEntry(entity, ...args)
        }
      }
    }
  })
})

  const strapi = new Strapi(ctx)

  if (process.server) {
    // Check if jwt to get user
    await strapi.fetchUser()

    ctx.beforeNuxtRender(({ nuxtState }) => {
      nuxtState.strapi = strapi.state
    })
  }

  const { nuxtState = {} } = ctx || {}
  // Client-side hydration
  if (process.client && nuxtState.strapi) {
    strapi.state = nuxtState.strapi
  }

  // SPA mode or fallback
  if (process.client && !nuxtState.strapi) {
    await strapi.fetchUser()
  }

  inject('strapi', strapi)
  ctx.$strapi = strapi
}
