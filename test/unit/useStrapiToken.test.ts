import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

import { useStrapiToken } from '../../src/runtime/composables/useStrapiToken'

let mockCookieValue: string | null = null
let mockNuxtApp: { _cookies: Record<string, unknown> }
const mockConfig = {
  strapi: { cookieName: 'strapi_jwt', cookie: {}, token: undefined as string | undefined }
}

vi.mock('#imports', () => ({
  useNuxtApp: () => mockNuxtApp,
  useRuntimeConfig: () => ({ public: mockConfig }),
  useCookie: () => ref(mockCookieValue)
}))

describe('useStrapiToken', () => {
  beforeEach(() => {
    mockCookieValue = null
    mockConfig.strapi.token = undefined
    mockNuxtApp = { _cookies: {} }
  })

  it('returns cookie ref when cookie has a value', () => {
    mockCookieValue = 'jwt-from-cookie'
    const token = useStrapiToken()
    expect(token.value).toBe('jwt-from-cookie')
  })

  it('returns static token ref when cookie is empty and config token is set', () => {
    mockCookieValue = null
    mockConfig.strapi.token = 'static-api-token'
    const token = useStrapiToken()
    expect(token.value).toBe('static-api-token')
  })

  it('caches token ref so subsequent calls return the same value', () => {
    mockCookieValue = null
    mockConfig.strapi.token = 'static-api-token'

    const first = useStrapiToken()
    const second = useStrapiToken()

    expect(first.value).toBe('static-api-token')
    expect(second.value).toBe('static-api-token')
  })

  it('returns null ref when no cookie and no config token', () => {
    mockCookieValue = null
    mockConfig.strapi.token = undefined
    const token = useStrapiToken()
    expect(token.value).toBeNull()
  })

  it('returns cached value on subsequent calls', () => {
    mockCookieValue = 'jwt-value'
    const first = useStrapiToken()
    const second = useStrapiToken()
    expect(first).toBe(second)
  })
})
