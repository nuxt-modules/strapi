const { resolve } = require('path')
const defu = require('defu')

const defaults = {
  url: process.env.STRAPI_URL || 'http://localhost:1337'
}

module.exports = async function (moduleOptions) {
  const options = defu({
    ...this.options.strapi,
    ...moduleOptions
  }, defaults)

  this.options.publicRuntimeConfig = this.options.publicRuntimeConfig || {}
  this.options.publicRuntimeConfig.strapiUrl = options.url

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'strapi.js',
    options
  })

  await this.requireModule('@nuxt/http')
  await this.requireModule('cookie-universal-nuxt')
}

module.exports.meta = require('../package.json')
