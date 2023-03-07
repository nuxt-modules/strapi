export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  extends: ['@nuxt-themes/docus'],
  modules: ['nuxt-plausible'],
  plausible: {
    domain: 'strapi.nuxtjs.org'
  }
})
