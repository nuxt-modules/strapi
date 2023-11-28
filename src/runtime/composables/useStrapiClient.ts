import type { FetchError, FetchOptions } from 'ofetch'
import { stringify } from 'qs'
import type { Strapi4Error } from '../types/v4'
import type { Strapi3Error } from '../types/v3'
import { useStrapiUrl } from './useStrapiUrl'
import { useStrapiVersion } from './useStrapiVersion'
import { useStrapiToken } from './useStrapiToken'
import { useNuxtApp } from '#imports'

// Fixes `ECONNREFUSED` on Node 18: https://github.com/node-fetch/node-fetch/issues/1624#issuecomment-1407717012
// Import dns only if running in a server environment during development
if (process.server && process.dev) {
  import('dns')
    .then((dns) => dns.setDefaultResultOrder('ipv4first'))
    .catch((error) => console.error('Error importing dns module:', error))
}

const defaultErrors = (err: FetchError) => ({
  v4: {
    error: {
      status: 500,
      name: 'UnknownError',
      message: err.message,
      details: err
    }
  },
  v3: {
    error: 'UnknownError',
    message: err.message,
    statusCode: 500
  }
})

export const useStrapiClient = () => {
  const nuxt = useNuxtApp()
  const baseURL = useStrapiUrl()
  const version = useStrapiVersion()
  const token = useStrapiToken()

  return async <T> (url: string, fetchOptions: FetchOptions = {}): Promise<T> => {
    const headers: HeadersInit = {}

    if (token && token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }

    // Map params according to strapi v3 and v4 formats
    if (fetchOptions.params) {
      const params = stringify(fetchOptions.params, { encodeValuesOnly: true })
      if (params) {
        url = `${url}?${params}`
      }
      delete fetchOptions.params
    }

    try {
      // @ts-ignore
      return await $fetch<T>(url, {
        retry: 0,
        baseURL,
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers
        }
      })
    } catch (err: any) {
      // @ts-ignore
      const e: Strapi4Error | Strapi3Error = err.data || defaultErrors(err)[version]

      nuxt.hooks.callHook('strapi:error' as any, e)
      throw e
    }
  }
}
