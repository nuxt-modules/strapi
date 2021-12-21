import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  buildModules: [
    '../src/module'
  ],
  strapi: {
    url: 'http://localhost:1337'
  }
})
