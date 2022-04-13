import { fileURLToPath } from 'url'
import { defu } from 'defu'
import { resolve } from 'pathe'
import { defineNuxtModule, addPlugin, extendViteConfig } from '@nuxt/kit'
import type { CookieOptions } from 'nuxt3/dist/app/composables/cookie'

export interface ModuleOptions {
  /**
   * Strapi API URL
   * @default process.env.STRAPI_URL
   * @example 'http://localhost:1337'
   * @type string
   */
  url?: string

  /**
  * Strapi Prefix
  * @default '/api'
  * @type string
  */
  prefix?: string

  /**
   * Strapi Version
   * @default 'v4'
   * @type string
   * @example 'v3'
   */
  version?: 'v4' | 'v3'

  /**
   * Nuxt Cookie Options
   * @default {}
   * @type CookieOptions
  */
   cookie?: CookieOptions
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/strapi',
    configKey: 'strapi',
    compatibility: {
      nuxt: '^3.0.0 || ^2.16.0',
      bridge: true
    }
  },
  defaults: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4',
    cookie: {}
  },
  setup (options, nuxt) {
    // Make sure url is set
    if (!options.url) {
      throw new Error('Missing `STRAPI_URL` in `.env`')
    }

    // Default runtimeConfig
    nuxt.options.runtimeConfig.public.strapi = defu(nuxt.options.runtimeConfig.public.strapi, {
      url: options.url,
      prefix: options.prefix,
      version: options.version,
      cookie: options.cookie
    })

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // Add plugin to load user before bootstrap
    addPlugin(resolve(runtimeDir, 'strapi.plugin'))

    // Add strapi composables
    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })

    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.include.push('qs')
    })
  }
})

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      strapi?: ModuleOptions
    }
  }
}
