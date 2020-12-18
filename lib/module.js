const { resolve } = require('path')
const defu = require('defu')

const defaults = {
  url: process.env.STRAPI_URL || 'http://localhost:1337',
  entities: []
}

module.exports = async function (moduleOptions) {
  const { nuxt } = this

  const options = defu(moduleOptions, nuxt.options.strapi, defaults)

  nuxt.options.publicRuntimeConfig = nuxt.options.publicRuntimeConfig || {}
  nuxt.options.publicRuntimeConfig.strapi = nuxt.options.publicRuntimeConfig.strapi || {}
  nuxt.options.publicRuntimeConfig.strapi.url = options.url

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'strapi.js',
    options
  })

  await this.requireModule('@nuxt/http')
  await this.requireModule('cookie-universal-nuxt')
}

module.exports.meta = require('../package.json')
