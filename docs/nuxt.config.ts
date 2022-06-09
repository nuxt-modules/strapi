import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  extends: ['./node_modules/@docus/docs-theme'],
  modules: ['@nuxthq/admin', '@docus/github', 'vue-plausible'],
  github: {
    owner: 'nuxt-community',
    repo: 'strapi-module',
    branch: 'dev'
  },
  theme: {},
  plausible: {
    domain: 'strapi.nuxtjs.org'
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: {
              100: '#FFFFFF',
              200: '#F2EFFF',
              300: '#D1C7FF',
              400: '#AF9EFF',
              500: '#8E75FF',
              600: '#603DFF',
              700: '#3205FF',
              800: '#2500CC',
              900: '#1B0094'
            }
          }
        }
      }
    }
  }
})
