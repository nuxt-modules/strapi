import { defineNuxtPlugin } from '#imports'

// Fixes `ECONNREFUSED` on Node 18: https://github.com/node-fetch/node-fetch/issues/1624#issuecomment-1407717012
export default defineNuxtPlugin({
  parallel: true,
  async setup () {
    if (process.dev) {
      try {
        const dns = await import('dns')

        await dns.setDefaultResultOrder('ipv4first')
      } catch (e) {
        console.error('Error importing dns module:', e)
      }
    }
  }
})
