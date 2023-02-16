import { useCookie, useNuxtApp, useRuntimeConfig } from '#app'

export const useStrapiToken = () => {
  const nuxt = useNuxtApp()
  const config = useRuntimeConfig()

  nuxt._cookies = nuxt._cookies || {}
  if (nuxt._cookies[config.strapi.cookieName]) {
    return nuxt._cookies[config.strapi.cookieName]
  }

  const cookie = useCookie<string | null>(config.strapi.cookieName, config.strapi.cookie)
  nuxt._cookies[config.strapi.cookieName] = cookie
  return cookie
}
