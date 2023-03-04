import { defu } from 'defu'
import { defineNuxtModule, addImportsDir, addPlugin, createResolver, extendViteConfig, logger } from '@nuxt/kit'
import type { CookieOptions } from 'nuxt/dist/app/composables/cookie'
import { joinURL } from 'ufo'

export interface AuthOptions {
  populate?: string | string[]
  fields?: string | string[]
}

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
   * Strapi API Token
   * @default ''
   * @type string | undefined
  */
  apiToken?: string,

  /**
   * Default Token for Requests
   * @default 'api'
   * @type 'api' | 'user'
  */
  defaultToken?: 'api' | 'user',

  /**
   * Nuxt Cookie Options
   * @default {}
   * @type CookieOptions
  */
  cookie?: CookieOptions

  /**
   * Strapi Cookie Name
   * @default 'strapi_jwt'
   * @type string
  */
  cookieName?: string

  /**
   * Strapi Auth Options
   * @default {}
   * @type AuthOptions
   * @example { populate: '*' }
   * @example { populate: ['profile', 'teams'] }
  */
  auth?: AuthOptions
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/strapi',
    configKey: 'strapi',
    compatibility: {
      nuxt: '^3.0.0-rc.8'
    }
  },
  defaults: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4',
    apiToken: process.env.STRAPI_API_TOKEN || '',
    defaultToken: 'api',
    cookie: {},
    auth: {},
    cookieName: 'strapi_jwt'
  },
  setup (options, nuxt) {
    // Default runtimeConfig
    nuxt.options.runtimeConfig.public.strapi = defu(nuxt.options.runtimeConfig.public.strapi, options)
    nuxt.options.runtimeConfig.strapi = defu(nuxt.options.runtimeConfig.strapi, options)

    const { resolve } = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    // Add plugin to load user before bootstrap
    addPlugin(resolve(runtimeDir, 'strapi.plugin'))

    // Add composables
    addImportsDir(resolve(runtimeDir, 'composables'))
    addImportsDir(resolve(runtimeDir, `composables-${options.version}`))

    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.include.push('qs')
    })

    if (nuxt.options.dev) {
      const adminUrl = joinURL(options.url as string, '/admin/')
      logger.info(`Strapi Admin URL: ${adminUrl}`)
    }
  }
})

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      strapi?: ModuleOptions
    }
  }
}
