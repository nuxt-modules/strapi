import { UBadge } from '#components'

// Expose Nuxt UI components to Nuxt Content
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('UBadge', UBadge)
})
