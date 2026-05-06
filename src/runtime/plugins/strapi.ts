import { useStrapiAuth } from '../composables/useStrapiAuth'
import { useStrapiToken } from '../composables/useStrapiToken'
import { useStrapiUser } from '../composables/useStrapiUser'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
// FIXME: https://github.com/nuxt/module-builder/issues/141#issuecomment-2078248248
import type {} from '#app'

export default defineNuxtPlugin(async () => {
  const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public
  const token = useStrapiToken()

  // Skip fetchUser when the active token is the static API token from config.
  // API tokens can't access /users/me and the 403 would wipe the token.
  // If a user cookie exists it takes priority over the config token, so fetchUser is safe.
  if (config.strapi.token && token.value === config.strapi.token) return

  const user = useStrapiUser()

  if (!user.value) {
    const { fetchUser } = useStrapiAuth()

    await fetchUser()
  }
})
