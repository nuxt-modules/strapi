import { $Strapi } from './strapi'
import { ModuleOptions } from './module'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $strapi: $Strapi;
  }

  interface Context {
    $strapi: $Strapi;
  }

  interface Configuration {
    strapi?: Partial<ModuleOptions>
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $strapi: $Strapi
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  interface Store<S> {
    $strapi: $Strapi
  }
}
