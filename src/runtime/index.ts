import { NuxtStrapiModuleOptions } from './types'
import { Strapi } from './strapi'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $strapi: Strapi;
  }

  interface Context {
    $strapi: Strapi;
  }

  interface Configuration {
    strapi?: Partial<NuxtStrapiModuleOptions>
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
