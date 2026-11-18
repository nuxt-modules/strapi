import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { $fetch, setup, useTestContext } from '@nuxt/test-utils/e2e'

const expectPublicMedia = (html: string) => {
  expect(html).toContain('src="https://media.example.com/uploads/image.jpg"')
  expect(html).toContain('src="https://media.example.com/uploads/no-leading-slash.jpg"')
  expect(html).toContain('src="https://cdn.example.com/image.jpg"')
  expect(html).toContain('src="http://cdn.example.com/image.jpg"')
  expect(html).not.toContain('src="http://localhost:1337/')
  expect(html).toContain('id="api-url">http://localhost:1337/api</p>')
}

describe('Strapi media with separate client/server URLs', async () => {
  await setup({
    rootDir: new URL('../fixtures/media', import.meta.url).pathname
  })

  it('uses the public media URL during server rendering', async () => {
    expectPublicMedia(await $fetch('/'))
  })

  it('uses the public media URL in prerendered HTML', async () => {
    const { nuxt } = useTestContext()
    const html = await readFile(join(nuxt.options.nitro.output.dir, 'public/prerender/index.html'), 'utf8')

    expectPublicMedia(html)
  })
})
