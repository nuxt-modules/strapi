import Vue from 'vue'
import Hookable from 'hookable'
import reqURL from 'requrl'
import { joinURL } from '@nuxt/ufo'

const TOKEN_KEY = 'strapi_jwt'

class Strapi extends Hookable {
  constructor (ctx) {
    super()

    ctx.$config = ctx.$config || {} // fallback for Nuxt < 2.13
    const runtimeConfig = ctx.$config.strapi || {}
    this.state = Vue.observable({ user: null })

    this.$cookies = ctx.app.$cookies
    this.$http = ctx.$http.create({})
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

      const { response: { data: { message: msg } } } = err

      let message
      if (Array.isArray(msg)) {
        message = msg[0].messages[0].message
      } else if (typeof msg === 'object' && msg !== null) {
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
    const { data } = await this.$http.$post(`/graphql`, query)
    return data
  }

  getToken () {
    let token
    if (process.client && typeof window.localStorage !== 'undefined') {
      token = window.localStorage.getItem(TOKEN_KEY)
    }
    if (!token) {
      token = this.$cookies.get(TOKEN_KEY)
    }
    return token
  }

  setToken (jwt) {
    this.$http.setToken(jwt, 'Bearer')
    if (process.client && typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem(TOKEN_KEY, jwt)
    }
    this.$cookies.set(TOKEN_KEY, jwt)
  }

  clearToken () {
    this.$http.setToken(false)
    if (process.client && typeof window.localStorage !== 'undefined') {
      window.localStorage.removeItem(TOKEN_KEY)
    }
    this.$cookies.remove(TOKEN_KEY)
  }

  syncToken (jwt) {
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

export default async function (ctx, inject) {
  <%= JSON.stringify(options.entities) %>.forEach((entity) => {
  let key
  let type = 'collection'
  if (typeof entity === 'object') {
    key = `$${entity.name}`
    type = entity.type || 'collection'
    entity = entity.name
  } else {
    key = `$${entity}`
  }
  if (Strapi.prototype.hasOwnProperty(key)) {
    return
  }
  Object.defineProperty(Strapi.prototype, key, {
    get () {
      const that = this
      return ({
        single: {
          find (...args) {
            return that.find(entity, ...args)
          },
          update (...args) {
            return that.update(entity, ...args)
          },
          delete (...args) {
            return that.delete(entity, ...args)
          }
        },
        collection: {
          find (...args) {
            return that.find(entity, ...args)
          },
          findOne (...args) {
            return that.findOne(entity, ...args)
          },
          count (...args) {
            return that.count(entity, ...args)
          },
          create (...args) {
            return that.create(entity, ...args)
          },
          update (...args) {
            return that.update(entity, ...args)
          },
          delete (...args) {
            return that.delete(entity, ...args)
          }
        }
      })[type]
    }
  })
})

  const strapi = new Strapi(ctx)

  if (process.server && !process.static) {
    // Check if jwt to get user
    await strapi.fetchUser()

    ctx.beforeNuxtRender(({ nuxtState }) => {
      nuxtState.strapi = strapi.state
    })
  }

  const { nuxtState = {} } = ctx || {}
  // Client-side hydration
  if (process.client && nuxtState.strapi) {
    strapi.state = Vue.observable(nuxtState.strapi)
  }

  // SPA mode or fallback
  if (process.client && !nuxtState.strapi) {
    await strapi.fetchUser()
  }

  inject('strapi', strapi)
  ctx.$strapi = strapi
}
