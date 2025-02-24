import { defu } from 'defu'
import { defineNuxtModule, addImportsDir, addPlugin, createResolver, extendViteConfig, logger } from '@nuxt/kit'
import type { CookieOptions } from 'nuxt/app'
import { joinURL } from 'ufo'

export type * from './runtime/types'

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
   * Strapi API TOKEN
   * @default process.env.STRAPI_TOKEN
   * @type string
   */
  token?: string

  /**
   * Strapi Prefix
   * @default '/api'
   * @type string
   */
  prefix?: string

  /**
   * Strapi Admin Prefix
   * @default '/admin'
   * @type string
   */
  admin?: string

  /**
   * Strapi Version
   * @default 'v5'
   * @type string
   * @example 'v4'
   */
  version?: 'v5' | 'v4' | 'v3'

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
      nuxt: '>=3.7.0'
    }
  },
  defaults: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    token: process.env.STRAPI_TOKEN,
    prefix: '/api',
    admin: '/admin',
    version: 'v5',
    cookie: {},
    auth: {},
    cookieName: 'strapi_jwt',
    devtools: false
  },
  setup(options, nuxt) {
    // Default runtimeConfig
    nuxt.options.runtimeConfig.public.strapi = defu(nuxt.options.runtimeConfig.public.strapi, options)
    nuxt.options.runtimeConfig.strapi = defu(nuxt.options.runtimeConfig.strapi, options)

    const { resolve } = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    // Add plugin to load user before bootstrap
    addPlugin(resolve(runtimeDir, 'plugins', 'strapi'))
    addPlugin(resolve(runtimeDir, 'plugins', 'dns.server'))

    // Add composables
    addImportsDir(resolve(runtimeDir, 'composables'))
    addImportsDir(resolve(runtimeDir, `composables-${options.version}`))

    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.include.push('qs')
    })

    const adminUrl = joinURL(nuxt.options.runtimeConfig.public.strapi.url, nuxt.options.runtimeConfig.public.strapi.admin)
    logger.info(`Strapi Admin URL: ${adminUrl}`)
    if (options.devtools) {
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
