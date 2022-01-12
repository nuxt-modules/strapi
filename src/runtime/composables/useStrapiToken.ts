import { useCookie, useNuxtApp, useRuntimeConfig } from '#app'

const getExpirationDate = (ms: number) => {
  return new Date(Date.now() + ms)
}

export const useStrapiToken = () => {
  const nuxtApp = useNuxtApp()

  nuxtApp._cookies = nuxtApp._cookies || {}
  if (nuxtApp._cookies.strapi_jwt) {
    return nuxtApp._cookies.strapi_jwt
  }

  const config = useRuntimeConfig()
  const expires = config.strapi.expires === 'session' ? undefined : getExpirationDate(config.strapi.expires)

  const cookie = useCookie<string | null>('strapi_jwt', { expires })
  nuxtApp._cookies.strapi_jwt = cookie
  return cookie
}
