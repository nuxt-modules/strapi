export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxtjs/plausible'],
  css: ['~/assets/css/main.css'],
  site: {
    name: 'Nuxt Strapi',
    url: 'https://strapi.nuxtjs.org'
  }
})
