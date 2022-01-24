import { CookieSerializeOptions } from 'cookie'

export type NuxtStrapiUser = Record<string, any>

export type NuxtStrapiQueryParams =
  string |
  {[key: string]: string | number | boolean | Array<string | number | boolean>} |
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
  username?: string;
  email: string;
  password: string;
  [key: string]: string | number | boolean | Array<string | number | boolean>;
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
