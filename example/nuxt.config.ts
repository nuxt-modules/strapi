import type { NuxtConfig } from '@nuxt/types'
import '../src/types'

export default <NuxtConfig> {
  buildModules: ['@nuxt/typescript-build'],
  modules: [
    '../src/module.ts'
  ],
  strapi: {
    url: 'https://atinux-strapi.herokuapp.com/',
    session: {
      key: 'session'
      // expires: '10s',
    }
  }
}
