import { addPluginTemplate, defineNuxtModule, installModule, resolveModule } from '@nuxt/kit'
import ms from 'ms'
import { resolve } from 'pathe'
import { NuxtStrapiModuleOptions } from './types'

export default defineNuxtModule<NuxtStrapiModuleOptions>({
  defaults: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    entities: [],
    key: 'strapi_jwt',
    expires: 'session',
    cookie: {}
  },
  configKey: 'strapi',
  async setup (options, nuxt) {
    if (typeof options.expires === 'string' && options.expires !== 'session') {
      options.expires = ms(options.expires)
    }

    (nuxt.options.publicRuntimeConfig as any).strapi = {
      url: options.url
    }

    const runtimeDir = resolve(__dirname, 'runtime')
    nuxt.options.alias['~strapi'] = runtimeDir
    nuxt.options.build.transpile.push(runtimeDir, 'destr', 'requrl', 'hookable', 'ufo')

    const templateDir = resolve(__dirname, 'templates')
    addPluginTemplate({
      src: resolveModule('./plugin.js', { paths: templateDir }),
      filename: 'strapi.js',
      options
    })

    await installModule(nuxt, { src: '@nuxt/http' })
    await installModule(nuxt, { src: 'cookie-universal-nuxt' })
  }
})
