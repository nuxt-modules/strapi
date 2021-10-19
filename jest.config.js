module.exports = {
  preset: '@nuxt/test-utils',
  transform: {
    '^.+\\.mjs$': 'babel-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!@nuxt/kit)/.*']
}
