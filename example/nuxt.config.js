const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [
    '@nuxtjs/proxy',
    { handler: require('../') }
  ],
  proxy: {
    '/api': {
      target: 'https://api.poe.house',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  strapi: {
    proxy: true,
    prefix: '/api'
  }
}
