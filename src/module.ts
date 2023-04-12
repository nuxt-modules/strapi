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

  /**
   * Add Strapi Admin in Nuxt Devtools
   *
   * Please read the instructions on https://strapi.nuxtjs.org/devtools
   *
   * @default false
  */
  devtools?: boolean
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
    cookie: {},
    auth: {},
    cookieName: 'strapi_jwt',
    devtools: false
  },
  setup (options, nuxt) {
    // Default runtimeConfig
    nuxt.options.runtimeConfig.strapi = defu(nuxt.options.runtimeConfig.strapi, options)
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

    const adminUrl = joinURL(nuxt.options.runtimeConfig.strapi.url, '/admin/')
    logger.info(`Strapi Admin URL: ${adminUrl}`)
    if (options.devtools) {
      // @ts-expect-error - private API
      nuxt.hook('devtools:customTabs', (iframeTabs) => {
        iframeTabs.push({
          name: 'strapi',
          title: 'Strapi',
          icon: 'i-logos-strapi-icon',
          view: {
            type: 'iframe',
            src: adminUrl
          }
        })
      })
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
