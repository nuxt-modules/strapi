import { defineNuxtConfig } from 'nuxt3'
import module from '..'

export default defineNuxtConfig({
  buildModules: [
    module
  ],
  strapi: {
    url: 'http://localhost:1337'
  }
})
