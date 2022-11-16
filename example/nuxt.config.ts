import module from '../src/module'

export default defineNuxtConfig({
  modules: [
    module
  ],
  // example of separate client/server URLs
  /* runtimeConfig: {
    strapi: { url: 'http://localhost:1337' },
    public: {
      strapi: { url: 'http://content:1337' }
    }
  }, */
  strapi: {
    url: 'http://localhost:1337'
  }
})
