import type { $Strapi } from './strapi'
import { ModuleOptions } from './module'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $strapi: $Strapi;
  }

  interface Context {
    $strapi: $Strapi;
  }

  interface Configuration {
    image?: Partial<ModuleOptions>
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $strapi: $Strapi
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $strapi: $Strapi
  }
}
