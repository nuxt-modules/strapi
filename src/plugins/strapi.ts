import { useStrapiVersion } from '../composables/useStrapiVersion'
import { useStrapi3 } from '../composables/useStrapi3'
import { useStrapi4 } from '../composables/useStrapi4'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async () => {
  const version = useStrapiVersion()
  const { fetchUser } = version === 'v3' ? useStrapi3() : useStrapi4()

  await fetchUser()
})
