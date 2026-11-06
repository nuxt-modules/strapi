import { defineNuxtConfig } from 'nuxt/config'
import strapi from '../../../src/module'

export default defineNuxtConfig({
  modules: [strapi],
  pages: false,
  devtools: { enabled: false },
  runtimeConfig: {
    strapi: { url: 'http://localhost:1337', token: '' },
    public: {
      strapi: { url: 'https://media.example.com', token: '' }
    }
  },
  compatibilityDate: '2026-05-06',
  nitro: {
    prerender: { routes: ['/prerender'], crawlLinks: false }
  }
})
