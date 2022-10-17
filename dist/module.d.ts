import * as _nuxt_schema from '@nuxt/schema';
import { CookieOptions } from 'nuxt/dist/app/composables/cookie';

interface AuthOptions {
    populate?: string | string[];
}
interface ModuleOptions {
    /**
     * Strapi API URL
     * @default process.env.STRAPI_URL
     * @example 'http://localhost:1337'
     * @type string
     */
    url?: string;
    /**
    * Strapi Prefix
    * @default '/api'
    * @type string
    */
    prefix?: string;
    /**
     * Strapi Version
     * @default 'v4'
     * @type string
     * @example 'v3'
     */
    version?: 'v4' | 'v3';
    /**
     * Nuxt Cookie Options
     * @default {}
     * @type CookieOptions
    */
    cookie?: CookieOptions;
    /**
     * Strapi Auth Options
     * @default {}
     * @type AuthOptions
     * @example { populate: '*' }
     * @example { populate: ['profile', 'teams'] }
    */
    auth?: AuthOptions;
    /**
     * Strapi Cookie Name
     * @default 'strapi_jwt'
     * @type string
    */
    cookieName?: string;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

declare module '@nuxt/schema' {
    interface ConfigSchema {
        publicRuntimeConfig?: {
            strapi?: ModuleOptions;
        };
    }
}

export { AuthOptions, ModuleOptions, _default as default };
