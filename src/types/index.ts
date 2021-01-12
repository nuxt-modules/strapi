import { ModuleOptions } from '../types/module'
import { Strapi } from '../runtime/strapi'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $strapi: Strapi;
  }

  interface Context {
    $strapi: Strapi;
  }

  interface Configuration {
    strapi?: Partial<ModuleOptions>
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $strapi: Strapi
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  interface Store<S> {
    $strapi: Strapi
  }
}

export * from './strapi'
export * from './module'
export { Strapi }
