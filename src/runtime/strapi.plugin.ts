import { defineNuxtPlugin } from '#app'
import { useStrapiAuth } from './composables/useStrapiAuth'

export default defineNuxtPlugin(async () => {
  const { fetchUser } = useStrapiAuth()

  await fetchUser()
})
