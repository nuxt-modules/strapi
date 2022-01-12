import defu from 'defu'
import { resolve } from 'pathe'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import type { StrapiOptions } from './types'

export default defineNuxtModule<StrapiOptions>({
  meta: {
    name: '@nuxtjs/strapi',
    configKey: 'strapi',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: true
    }
  },
  defaults: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4',
    cookie: {}
  },
  setup (options: StrapiOptions, nuxt) {
    // Make sure url is set
    if (!options.url) {
      throw new Error('Missing `STRAPI_URL` in `.env`')
    }

    // Default runtimeConfig
    nuxt.options.publicRuntimeConfig.strapi = defu(nuxt.options.publicRuntimeConfig.strapi, {
      url: options.url,
      prefix: options.prefix,
      version: options.version,
      cookie: options.cookie
    })

    // Transpile runtime
    const runtimeDir = resolve(__dirname, './runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    // Add plugin to load user before bootstrap
    addPlugin(resolve(runtimeDir, 'strapi.plugin'))

    // Add strapi composables
    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })
  }
})

export * from './types'

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      strapi?: StrapiOptions
    }
  }
  interface NuxtConfig {
    strapi?: StrapiOptions
  }
  interface NuxtOptions {
    strapi?: StrapiOptions
  }
}
