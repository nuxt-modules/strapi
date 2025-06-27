export default defineNuxtConfig({
  modules: ['@nuxtjs/plausible'],
  css: ['../app/assets/css/main.css'],
  site: {
    name: 'Nuxt Strapi',
    url: 'https://strapi.nuxtjs.org'
  },
  future: {
    compatibilityVersion: 4
  }
})
