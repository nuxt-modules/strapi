import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('strapi module', async () => {
  await setup({
    rootDir: new URL('../../playground', import.meta.url).pathname
  })

  it('renders the playground index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('</html>')
  })
})
