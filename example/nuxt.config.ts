import { defineNuxtConfig } from 'nuxt'
import module from '..'

export default defineNuxtConfig({
  buildModules: [
    module
  ],
  strapi: {
    url: 'http://localhost:1337'
  }
})
