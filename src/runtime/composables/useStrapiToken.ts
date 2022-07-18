import { useCookie, useNuxtApp, useRuntimeConfig } from '#app'

export const useStrapiToken = () => {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()

  nuxtApp._cookies = nuxtApp._cookies || {}
  if (nuxtApp._cookies[config.strapi.cookieName]) {
    return nuxtApp._cookies[config.strapi.cookieName]
  }

  const cookie = useCookie<string | null>(config.strapi.cookieName, config.strapi.cookie)
  nuxtApp._cookies[config.strapi.cookieName] = cookie
  return cookie
}
