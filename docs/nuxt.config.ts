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

  icon: {
    clientBundle: {
      scan: true
    }
  },

  routeRules: {
    '/api/search.json': { prerender: true }
  },

  // Devtools / Typescript
  devtools: { enabled: true },

  typescript: { strict: false },

  compatibilityDate: '2024-09-26'
})
