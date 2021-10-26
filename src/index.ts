import { addPlugin, addTemplate, defineNuxtModule, installModule, resolveModule } from '@nuxt/kit'
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

    nuxt.options.publicRuntimeConfig.strapi = {
      url: options.url
    }

    const runtimeDir = resolve(__dirname, 'runtime')
    nuxt.options.alias['~strapi'] = runtimeDir
    nuxt.options.build.transpile.push(runtimeDir, 'destr', 'requrl', 'hookable', 'ufo')

    nuxt.options.alias['#strapi-config'] = addTemplate({
      src: '',
      filename: 'strapi-config.mjs',
      getContents: () => `export default ${JSON.stringify(options, null, 2)}`
    }).dst

    addPlugin(resolveModule('./plugin.mjs', { paths: runtimeDir }))

    await installModule(nuxt, { src: '@nuxt/http' })
    await installModule(nuxt, { src: 'cookie-universal-nuxt' })
  }
})
