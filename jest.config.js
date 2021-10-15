module.exports = {
  preset: '@nuxt/test-utils',
  transform: {
    '^.+\\.mjs$': 'babel-jest'
  },
  moduleNameMapper: {
    '~strapi': '<rootDir>/src/runtime/index.ts',
    '~/(.*)': '<rootDir>/$1'
  },
  transformIgnorePatterns: ['node_modules/(?!@nuxt/kit)/.*']
}
