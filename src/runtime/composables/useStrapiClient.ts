import type { FetchError, FetchOptions } from 'ohmyfetch'
import { stringify } from 'qs'
import { useNuxtApp } from '#app'
import type { Strapi4Error } from '../types/v4'
import type { Strapi3Error } from '../types/v3'
import { useStrapiUrl } from './useStrapiUrl'
import { useStrapiVersion } from './useStrapiVersion'
import { useStrapiToken } from './useStrapiToken'

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
      const e: Strapi4Error | Strapi3Error = err.data || defaultErrors(err)[version]

      nuxt.hooks.callHook('strapi:error' as any, e)
      throw e
    }
  }
}
