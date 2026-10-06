import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import type { Ref } from 'vue'

import { useStrapiToken } from '../../src/runtime/composables/useStrapiToken'

let mockCookieValue: string | null = null
let mockCookie: Ref<string | null>
let mockNuxtApp: Record<string, unknown>
const mockConfig = {
  strapi: { cookieName: 'strapi_jwt', cookie: {}, token: undefined as string | undefined }
}

vi.mock('#imports', () => ({
  useNuxtApp: () => mockNuxtApp,
  useRuntimeConfig: () => ({ public: mockConfig }),
  useCookie: () => {
    mockCookie = ref(mockCookieValue)
    return mockCookie
  }
}))

describe('useStrapiToken', () => {
  beforeEach(() => {
    mockCookieValue = null
    mockConfig.strapi.token = undefined
    mockNuxtApp = {}
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

  it('writes to the cookie when a token is set over the static token', () => {
    mockConfig.strapi.token = 'static-api-token'
    const token = useStrapiToken()

    token.value = 'user-jwt'

    expect(mockCookie.value).toBe('user-jwt')
    expect(useStrapiToken().value).toBe('user-jwt')
  })

  it('does not fall back to the static token once cleared', () => {
    mockConfig.strapi.token = 'static-api-token'
    const token = useStrapiToken()

    token.value = null

    expect(token.value).toBeNull()
    expect(useStrapiToken().value).toBeNull()
  })

  it('does not use the nuxt cookies cache', () => {
    mockCookieValue = 'jwt-value'
    useStrapiToken()
    expect(mockNuxtApp._cookies).toBeUndefined()
  })
})
