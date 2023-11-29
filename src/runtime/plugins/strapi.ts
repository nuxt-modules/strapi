import { useStrapiAuth } from '../composables/useStrapiAuth'
import { useStrapiUser } from '../composables/useStrapiUser'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async () => {
  const user = useStrapiUser()

  if (!user.value) {
    const { fetchUser } = useStrapiAuth()

    await fetchUser()
  }
})
