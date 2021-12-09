import { defineDocusConfig } from 'docus'

export default defineDocusConfig({
  title: '@nuxtjs/strapi',
  url: 'https://strapi.nuxtjs.org',
  theme: '@docus/docs-theme',
  template: 'docs',
  twitter: '@nuxt_js',
  github: {
    repo: 'nuxt-community/strapi-module',
    branch: 'main',
    releases: true
  }
})
