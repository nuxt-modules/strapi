import { describe, expect, it, vi } from 'vitest'

import { useStrapiMedia } from '../../src/runtime/composables/useStrapiMedia'

const mockConfig = {
  strapi: { url: 'http://localhost:1337', prefix: '/api', version: 'v5' },
  public: {
    strapi: { url: 'https://media.example.com', prefix: '/api', version: 'v5' }
  }
}

vi.mock('#imports', () => ({
  useRuntimeConfig: () => mockConfig
}))

describe('useStrapiMedia', () => {
  it('returns absolute https URLs as-is', () => {
    expect(useStrapiMedia('https://cdn.example.com/image.jpg'))
      .toBe('https://cdn.example.com/image.jpg')
  })

  it('returns absolute http URLs as-is', () => {
    expect(useStrapiMedia('http://cdn.example.com/image.jpg'))
      .toBe('http://cdn.example.com/image.jpg')
  })

  it('handles Strapi Cloud absolute URLs', () => {
    expect(useStrapiMedia('https://domain.media.strapiapp.com/uploads/image.jpg'))
      .toBe('https://domain.media.strapiapp.com/uploads/image.jpg')
  })

  it('joins relative paths with the public Strapi URL', () => {
    expect(useStrapiMedia('/uploads/image.jpg'))
      .toBe('https://media.example.com/uploads/image.jpg')
  })

  it('joins paths without leading slash', () => {
    expect(useStrapiMedia('uploads/image.jpg'))
      .toBe('https://media.example.com/uploads/image.jpg')
  })
})
