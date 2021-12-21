import { defineNuxtConfig } from 'nuxt3'
import module from '../src/module'

export default defineNuxtConfig({
  buildModules: [
    module
  ],
  strapi: {
    url: 'http://localhost:1337'
  }
})
