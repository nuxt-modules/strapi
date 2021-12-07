import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async () => {
  const version = useStrapiVersion()
  const { fetchUser } = version === 'v3' ? useStrapi3() : useStrapi4()

  await fetchUser()
})
