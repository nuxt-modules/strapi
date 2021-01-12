import { CookieSerializeOptions } from 'cookie'

export interface ModuleOptions {
  url: string
  entities: string[],
  key: string,
  expires: 'session' | string | number,
  cookie: CookieSerializeOptions
}
