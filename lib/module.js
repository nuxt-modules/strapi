const { resolve } = require('path')

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['strapi-module'],
    ...moduleOptions
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'strapi-module.js',
    options
  })
}

module.exports.meta = require('../package.json')
