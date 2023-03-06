import { defineNuxtPlugin } from '#app'
import { useStrapiAuth } from './composables/useStrapiAuth'
import { useStrapiUser } from './composables/useStrapiUser'

export default defineNuxtPlugin(async () => {
  const user = useStrapiUser()

  if (!user.value) {
    const { fetchUser } = useStrapiAuth()

    await fetchUser()
  }
})
