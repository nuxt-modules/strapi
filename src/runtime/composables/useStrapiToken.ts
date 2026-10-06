import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

export const useStrapiToken = (): Ref<string | null> => {
  const nuxt = useNuxtApp()
  const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public

  if (nuxt._strapiToken) {
    return nuxt._strapiToken as Ref<string | null>
  }

  const cookie = useCookie<string | null>(config.strapi.cookieName, config.strapi.cookie)
  // Static API token from config, used as fallback until a token is set explicitly
  const fallback = ref<string | null>((!cookie.value && config.strapi.token) || null)

  const token = computed<string | null>({
    get: () => cookie.value || fallback.value,
    set: (value) => {
      fallback.value = null

      if ((cookie.value ?? null) !== value) {
        cookie.value = value
      }
    }
  })

  nuxt._strapiToken = token
  return token
}
