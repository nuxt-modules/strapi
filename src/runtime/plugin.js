import Vue from 'vue'
import { Strapi } from '~strapi'

const options = <%= JSON.stringify(options) %>

options.entities.forEach((entity) => {
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

export default async function (ctx, inject) {
  const strapi = new Strapi(ctx, options)

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
