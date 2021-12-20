import { useCookie, useNuxtApp } from '#app'

export const useStrapiToken = () => {
  const nuxtApp = useNuxtApp()

  nuxtApp._cookies = nuxtApp._cookies || {}
  if (nuxtApp._cookies.strapi_jwt) {
    return nuxtApp._cookies.strapi_jwt
  }

  const cookie = useCookie<string | null>('strapi_jwt')
  nuxtApp._cookies.strapi_jwt = cookie
  return cookie
}
