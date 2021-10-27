import { get, setupTest } from '@nuxt/test-utils'

describe('module', () => {
  setupTest({
    fixture: '../example',
    configFile: 'nuxt.config.ts',
    server: true,
    config: {
      strapi: {
        expires: '15d'
      }
    },
    setupTimeout: 120000
  })

  it('renders', async () => {
    const { body } = await get('/')
    expect(body).toContain('@nuxtjs/strapi')
    expect(body).toContain('http://localhost:1337')
  })
})
