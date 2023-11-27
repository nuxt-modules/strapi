export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  extends: ['@nuxt-themes/docus'],
  modules: ['nuxt-plausible'],
  // @ts-ignore
  plausible: {
    domain: 'strapi.nuxtjs.org'
  }
})
