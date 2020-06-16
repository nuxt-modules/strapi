import { isArray, isObject } from 'lodash'

class Strapi {
  constructor ($axios, $cookies) {
    this.$axios = $axios
    this.$cookies = $cookies
  }

  async request (method, url, config) {
    const { data } = await this.$axios({
      method,
      url,
      ...config
    })

    return data
  }

  async register (email, password) {
    this.clearToken()
    const authentication = await this.$axios.$post('/auth/local/register', { email, password })
    this.setToken(authentication.jwt)
    return authentication
  }

  async login (email, password) {
    this.clearToken()
    const authentication = await this.$axios.$post('/auth/local', { email, password })
    this.setToken(authentication.jwt)
    return authentication
  }

  forgotPassword (email, url) {
    this.clearToken()
    return this.$axios.$post('/auth/forgot-password', { email, url })
  }

  async resetPassword (code, password, passwordConfirmation) {
    this.clearToken()
    const authentication = await this.$axios.$post('/auth/reset-password', { code, password, passwordConfirmation })
    this.setToken(authentication.jwt)
    return authentication
  }

  getEntries (contentTypePluralized, params) {
    return this.$axios.$get(`/${contentTypePluralized}`, { params })
  }

  getEntryCount (contentType, params) {
    return this.$axios.$get(`/${contentType}/count`, { params })
  }

  getEntry (contentTypePluralized, id) {
    return this.$axios.$get(`/${contentTypePluralized}/${id}`)
  }

  createEntry (contentTypePluralized, data) {
    return this.$axios.$post(`/${contentTypePluralized}`, data)
  }

  updateEntry (contentTypePluralized, id, data) {
    return this.$axios.$put(`/${contentTypePluralized}/${id}`, data)
  }

  deleteEntry (contentTypePluralized, id) {
    return this.$axios.$delete(`/${contentTypePluralized}/${id}`)
  }

  setToken (jwt, comesFromStorage) {
    this.$axios.setToken(jwt, 'Bearer')
    if (!comesFromStorage) {
      this.$cookies.set('jwt', jwt)
    }
  }

  clearToken () {
    this.$axios.setToken(false)
    this.$cookies.remove('jwt')
  }
}

export default function ({ $axios, app }, inject) {
  const strapi = new Strapi($axios, app.$cookies)

  $axios.onError((error) => {
    const { response: { data: { message } } } = error

    let description
    if (isArray(message)) {
      description = message[0].messages[0].message
    } else if (isObject(message)) {
      description = message.message
    } else {
      description = message
    }

    if (app.$toast) {
      app.$toast.error(description)
    } else {
      throw new Error(description)
    }
  })

  inject('strapi', strapi)
}
