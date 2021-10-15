import type { CookieSerializeOptions } from 'cookie'
import type { Strapi } from './src/runtime'

export type NuxtStrapiUser = Record<string, any>

export type NuxtStrapiQueryParams =
  string |
  {[key: string]: string | number | boolean} |
  Array<Array<string | number | boolean>> |
  URLSearchParams

export interface NuxtStrapiLoginResult {
  user: NuxtStrapiUser
  jwt: string
}

export interface StrapiOptions {
  url: string
  key: string
  expires: 'session' | number
  cookie: CookieSerializeOptions
}

export interface NuxtStrapiGraphQLParams {
  query: string;
}

export interface NuxtStrapiRegistrationData {
  username: string;
  email: string;
  password: string;
}

export interface NuxtStrapiLoginData {
  /**
   * Can be either the email or the username set by the user.
   * */
  identifier: string;
  password: string;
}

export interface NuxtStrapiEmailData {
  email: string;
}

export interface NuxtStrapiResetPasswordData {
  code: string;
  password: string;
  passwordConfirmation: string;
}

export interface NuxtStrapiModuleOptions {
  url: string
  entities: string[],
  key: string,
  expires: 'session' | string | number,
  cookie: CookieSerializeOptions
}

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
