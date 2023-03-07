import type { FetchError, FetchOptions } from 'ohmyfetch'
import { stringify } from 'qs'
import { useNuxtApp, useRuntimeConfig } from '#app'
import type { Strapi4Error } from '../types/v4'
import type { Strapi3Error } from '../types/v3'
import { useStrapiUrl } from './useStrapiUrl'
import { useStrapiVersion } from './useStrapiVersion'
import { useStrapiToken } from './useStrapiToken'

type DefaultError = {
  [key: string]: Strapi3Error | Strapi4Error
}

const defaultErrors = (err: FetchError): DefaultError => ({
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

export const useStrapiClient = (options?: {
  token?: string
}) => {
  const nuxt = useNuxtApp()
  const config = useRuntimeConfig()
  const userToken = useStrapiToken()
  const baseURL = useStrapiUrl()
  const version = useStrapiVersion()

  return async <T>(url: string, fetchOptions: FetchOptions = {}): Promise<T> => {
    const headers: HeadersInit = {}

    if (options?.token) {
      headers.Authorization = `Bearer ${options.token}`
    } else if (config.strapi.defaultToken === 'user' && userToken.value) {
      headers.Authorization = `Bearer ${userToken.value}`
    } else if ((config.strapi.defaultToken === 'api' || config.strapi.apiToken) || config.strapi.apiToken) {
      headers.Authorization = `Bearer ${config.strapi.apiToken}`
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
