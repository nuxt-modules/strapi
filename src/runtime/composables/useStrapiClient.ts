import type { FetchError, FetchOptions } from 'ohmyfetch'
import qs from 'qs'
import type { Strapi4Error } from '../types/v4'
import type { Strapi3Error } from '../types/v3'
import { useStrapiUrl } from './useStrapiUrl'
import { useStrapiVersion } from './useStrapiVersion'
import { useStrapiToken } from './useStrapiToken'
import { useNuxtApp } from '#app'

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

    // Map params according to strapi v4 format
    if (version === 'v4' && fetchOptions.params) {
      url = `${url}?${qs.stringify(fetchOptions.params, { encodeValuesOnly: true })}`
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
      const e: Strapi4Error | Strapi3Error = err.response?.data || defaultErrors(err)[version]

      nuxt.hooks.callHook('strapi:error' as any, e)
      throw e
    }
  }
}
