import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

const mockClient = vi.fn()
const mockToken = ref<string | null>(null)
const mockUser = ref<any>(null)
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

import { useStrapiAuth } from '../../src/runtime/composables/useStrapiAuth'

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

    it('clears both token and user on fetch error', async () => {
      mockToken.value = 'expired-jwt'
      mockUser.value = { id: 1, username: 'john' }
      mockClient.mockRejectedValue(new Error('401'))

      const { fetchUser } = useStrapiAuth()
      await fetchUser()

      expect(mockToken.value).toBeNull()
      expect(mockUser.value).toBeNull()
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
