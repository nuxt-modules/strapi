export default defineNuxtConfig({
  modules: [
    '../src/module'
  ],

  devtools: { enabled: true },

  compatibilityDate: '2026-05-06',

  // example of separate client/server URLs
  // runtimeConfig: {
  //   strapi: { url: 'http://localhost:1337' },
  //   public: {
  //     strapi: { url: 'http://localhost:1337' }
  //   }
  // },

  strapi: {
    version: 'v5',
    url: 'http://localhost:1337'
    // To enable the devtools, read https://strapi.nuxtjs.org/devtools
    // devtools: true
  }
})
