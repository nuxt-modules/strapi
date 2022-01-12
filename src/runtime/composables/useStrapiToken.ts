import { useCookie, useNuxtApp, useRuntimeConfig } from '#app'

export const useStrapiToken = () => {
  const nuxtApp = useNuxtApp()

  nuxtApp._cookies = nuxtApp._cookies || {}
  if (nuxtApp._cookies.strapi_jwt) {
    return nuxtApp._cookies.strapi_jwt
  }

  const config = useRuntimeConfig()
  const opts = config.strapi.cookie

  const cookie = useCookie<string | null>('strapi_jwt', opts)
  nuxtApp._cookies.strapi_jwt = cookie
  return cookie
}
