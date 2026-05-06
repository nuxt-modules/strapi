export default defineNuxtConfig({
  extends: ['docus'],
  css: ['~/assets/css/main.css'],
  site: {
    name: 'Nuxt Strapi',
    url: 'https://strapi.nuxtjs.org'
  },
  llms: {
    domain: 'https://strapi.nuxtjs.org',
    title: 'Nuxt Strapi',
    description: 'Nuxt Strapi is a module for Nuxt 3 to integrate Strapi CMS.'
  }
})
