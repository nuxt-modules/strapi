<template>
  <div />
</template>

<script setup lang="ts">
import type { StrapiAuthProvider } from '@nuxtjs/strapi'

const { authenticateProvider } = useStrapiAuth()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {
    await authenticateProvider(route.params.provider as StrapiAuthProvider, route.query.access_token as string)
  } catch (e) {
    console.error(e)
  }

  router.push('/')
})
</script>
