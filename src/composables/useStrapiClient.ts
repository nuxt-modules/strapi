import type { FetchOptions } from 'ohmyfetch'
import type { StrapiError as Strapi4Error } from '../types/v4'
import type { StrapiError as Strapi3Error } from '../types/v3'

const defaultErrors = err => ({
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

  return async <T> (url: string, fetchOptions: FetchOptions = {}): Promise<T> => {
    const headers: any = {}

    const token = useStrapiToken().value
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    try {
      return await $fetch<T>(url, {
        baseURL,
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers
        }
      })
    } catch (err) {
      const e: Strapi4Error | Strapi3Error = err.response?.data || defaultErrors(err)[version]

      nuxt.hooks.callHook('strapi:error' as any, e)
      throw e
    }
  }
}
