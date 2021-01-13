import type { NuxtConfig } from '@nuxt/types'

export default <NuxtConfig>{
  buildModules: ['@nuxt/typescript-build'],
  modules: [
    '../src/module.ts'
  ]
}
