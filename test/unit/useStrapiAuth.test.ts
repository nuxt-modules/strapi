import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

import { useStrapiAuth } from '../../src/runtime/composables/useStrapiAuth'

const mockClient = vi.fn()
const mockToken = ref<string | null>(null)
const mockUser = ref<Record<string, unknown> | null>(null)
const mockConfig = {
  strapi: { url: 'http://localhost:1337', prefix: '/api', version: 'v5', cookieName: 'strapi_jwt', cookie: {}, token: undefined, auth: {} }
}

vi.mock('#imports', () => ({
  useNuxtApp: () => ({
    _cookies: {},
    hooks: { callHook: vi.fn() }
  }),
  useRuntimeConfig: () => ({ public: mockConfig }),
  useCookie: () => mockToken,
  useState: () => mockUser
}))

vi.stubGlobal('$fetch', mockClient)

describe('useStrapiAuth', () => {
  beforeEach(() => {
    mockToken.value = null
    mockUser.value = null
    mockClient.mockReset()
  })

  describe('fetchUser', () => {
    it('fetches user when token exists', async () => {
      mockToken.value = 'valid-jwt'
      mockClient.mockResolvedValue({ id: 1, username: 'john' })

      const { fetchUser } = useStrapiAuth()
      await fetchUser()

      expect(mockUser.value).toEqual({ id: 1, username: 'john' })
    })

    it('does not fetch when no token', async () => {
      mockToken.value = null
      const { fetchUser } = useStrapiAuth()
      await fetchUser()

      expect(mockClient).not.toHaveBeenCalled()
    })

    it.each([401, 403])('clears both token and user on %i', async (status) => {
      mockToken.value = 'expired-jwt'
      mockUser.value = { id: 1, username: 'john' }
      mockClient.mockRejectedValue({ data: { data: null, error: { status, name: 'Error', message: 'Error', details: {} } } })

      const { fetchUser } = useStrapiAuth()
      await fetchUser()

      expect(mockToken.value).toBeNull()
      expect(mockUser.value).toBeNull()
    })

    it('keeps token and user when the request fails for another reason', async () => {
      mockToken.value = 'valid-jwt'
      mockUser.value = { id: 1, username: 'john' }
      mockClient.mockRejectedValue(new Error('fetch failed'))

      const { fetchUser } = useStrapiAuth()
      await fetchUser()

      expect(mockToken.value).toBe('valid-jwt')
      expect(mockUser.value).toEqual({ id: 1, username: 'john' })
    })
  })

  describe('logout', () => {
    it('clears token and user', () => {
      mockToken.value = 'jwt'
      mockUser.value = { id: 1, username: 'john' }

      const { logout } = useStrapiAuth()
      logout()

      expect(mockToken.value).toBeNull()
      expect(mockUser.value).toBeNull()
    })
  })

  describe('getProviderAuthenticationUrl', () => {
    it('returns correct provider URL', () => {
      const { getProviderAuthenticationUrl } = useStrapiAuth()
      expect(getProviderAuthenticationUrl('github'))
        .toBe('http://localhost:1337/api/connect/github')
    })
  })
})
