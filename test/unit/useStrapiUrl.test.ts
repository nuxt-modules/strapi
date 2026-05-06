import { describe, expect, it, vi, beforeEach } from 'vitest'

import { useStrapiUrl } from '../../src/runtime/composables/useStrapiUrl'

let mockVersion = 'v5'
let mockUrl = 'http://localhost:1337'
let mockPrefix = '/api'

vi.mock('#imports', () => ({
  useRuntimeConfig: () => ({
    public: { strapi: { version: mockVersion, url: mockUrl, prefix: mockPrefix } }
  })
}))

describe('useStrapiUrl', () => {
  beforeEach(() => {
    mockVersion = 'v5'
    mockUrl = 'http://localhost:1337'
    mockPrefix = '/api'
  })

  it('returns url + prefix for v5', () => {
    mockVersion = 'v5'
    expect(useStrapiUrl()).toBe('http://localhost:1337/api')
  })

  it('returns url + prefix for v4', () => {
    mockVersion = 'v4'
    expect(useStrapiUrl()).toBe('http://localhost:1337/api')
  })

  it('returns url without prefix for v3', () => {
    mockVersion = 'v3'
    expect(useStrapiUrl()).toBe('http://localhost:1337')
  })
})
