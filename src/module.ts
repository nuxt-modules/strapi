import { resolve } from 'path'
import defu from 'defu'
import ms from 'ms'
import { name, version } from '../package.json'
import type { ModuleOptions } from './types'

const defaults: ModuleOptions = {
  url: process.env.STRAPI_URL || 'http://localhost:1337',
  entities: [],
  session: {
    key: 'strapi_jwt',
    expires: 'session',
    cookie: {}
  }
}

async function strapiModule (moduleOptions) {
  const { nuxt } = this

  const options = defu(moduleOptions, nuxt.options.strapi, defaults)
  if (typeof options.session.expires === 'string' && options.session.expires !== 'session') {
    options.session.expires = ms(options.session.expires)
  }

  nuxt.options.publicRuntimeConfig = nuxt.options.publicRuntimeConfig || {}
  nuxt.options.publicRuntimeConfig.strapi = nuxt.options.publicRuntimeConfig.strapi || {}
  nuxt.options.publicRuntimeConfig.strapi.url = options.url
  nuxt.options.alias['@nuxtjs/strapi/runtime'] = resolve(__dirname, 'runtime')
  nuxt.options.build.transpile.push(resolve(__dirname, '..'), 'destr', 'requrl', 'hookable', 'ufo')

  this.addPlugin({
    src: resolve(__dirname, '../templates/plugin.js'),
    fileName: 'strapi.js',
    options
  })

  await this.requireModule('@nuxt/http')
  await this.requireModule('cookie-universal-nuxt')
}

(strapiModule as any).meta = { name, version }

export default strapiModule
