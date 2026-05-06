import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

import { useStrapiClient } from '../../src/runtime/composables/useStrapiClient'

const mockToken = ref<string | null>('test-token')
const mockFetch = vi.fn()
const mockConfig = {
  strapi: { url: 'http://localhost:1337', prefix: '/api', version: 'v5', cookieName: 'strapi_jwt', cookie: {}, token: undefined, auth: {} }
}

vi.mock('#imports', () => ({
  useNuxtApp: () => ({
    _cookies: {},
    hooks: { callHook: vi.fn() }
  }),
  useRuntimeConfig: () => ({ public: mockConfig }),
  useCookie: () => ref(null),
  useState: () => ref(null)
}))

vi.stubGlobal('$fetch', mockFetch)

describe('useStrapiClient', () => {
  beforeEach(() => {
    mockFetch.mockReset()
    mockToken.value = 'test-token'
  })

  it('serializes params into query string', async () => {
    mockFetch.mockResolvedValue({ data: [] })
    const client = useStrapiClient()
    await client('/articles', { params: { filters: { title: { $eq: 'test' } } } })

    expect(mockFetch.mock.calls[0][0]).toBe('/articles?filters[title][$eq]=test')
  })

  it('does not mutate the original fetchOptions object', async () => {
    mockFetch.mockResolvedValue({ data: [] })
    const client = useStrapiClient()
    const options = { params: { populate: '*' } }
    await client('/articles', options)

    expect(options.params).toEqual({ populate: '*' })
  })

  it('throws v5 default error when fetch fails without data', async () => {
    const fetchError = Object.assign(new Error('Network error'), { data: undefined })
    mockFetch.mockRejectedValue(fetchError)

    const client = useStrapiClient()
    await expect(client('/articles')).rejects.toEqual({
      error: {
        status: 500,
        name: 'UnknownError',
        message: 'Network error',
        details: fetchError
      }
    })
  })

  it('throws err.data when fetch fails with data', async () => {
    const strapiError = { error: { status: 404, name: 'NotFound', message: 'Not found', details: {} } }
    const fetchError = Object.assign(new Error('Not found'), { data: strapiError })
    mockFetch.mockRejectedValue(fetchError)

    const client = useStrapiClient()
    await expect(client('/articles')).rejects.toEqual(strapiError)
  })

  it('passes retry: 0 to $fetch', async () => {
    mockFetch.mockResolvedValue({})
    const client = useStrapiClient()
    await client('/articles')

    expect(mockFetch).toHaveBeenCalledWith(
      '/articles',
      expect.objectContaining({ retry: 0 })
    )
  })
})
