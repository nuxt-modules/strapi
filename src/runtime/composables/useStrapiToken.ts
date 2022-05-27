import { useCookie, useNuxtApp, useRuntimeConfig } from '#app'

export const useStrapiToken = () => {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()

  nuxtApp._cookies = nuxtApp._cookies || {}
  if (nuxtApp._cookies.strapi_jwt) {
    return nuxtApp._cookies.strapi_jwt
  }

  const cookie = useCookie<string | null>('strapi_jwt', config.strapi.cookie)
  nuxtApp._cookies.strapi_jwt = cookie
  return cookie
}
