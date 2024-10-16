// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/plausible',
    'nuxt-og-image'
  ],

  // Devtools / Typescript
  devtools: { enabled: true },

  routeRules: {
    '/api/search.json': { prerender: true }
  },

  compatibilityDate: '2024-09-26',

  typescript: { strict: false },

  icon: {
    clientBundle: {
      scan: true
    }
  }
})
