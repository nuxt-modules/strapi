import { describe, expect, it } from 'vitest'
import { stringify } from '../../src/runtime/utils/stringify'

describe('stringify', () => {
  it('returns empty string for empty object', () => {
    expect(stringify({})).toBe('')
  })

  it('serializes flat params', () => {
    expect(stringify({ _limit: 10, _sort: 'title:asc' }))
      .toBe('_limit=10&_sort=title%3Aasc')
  })

  it('serializes nested objects with bracket notation', () => {
    expect(stringify({ filters: { title: { $eq: 'hello' } } }))
      .toBe('filters[title][$eq]=hello')
  })

  it('serializes deeply nested filters', () => {
    expect(stringify({ filters: { author: { name: { $contains: 'John' } } } }))
      .toBe('filters[author][name][$contains]=John')
  })

  it('serializes arrays with index notation', () => {
    expect(stringify({ sort: ['title:asc', 'date:desc'] }))
      .toBe('sort[0]=title%3Aasc&sort[1]=date%3Adesc')
  })

  it('serializes arrays of objects', () => {
    expect(stringify({ filters: { status: { $in: ['published', 'draft'] } } }))
      .toBe('filters[status][$in][0]=published&filters[status][$in][1]=draft')
  })

  it('serializes pagination params', () => {
    expect(stringify({ pagination: { page: 1, pageSize: 25 } }))
      .toBe('pagination[page]=1&pagination[pageSize]=25')
  })

  it('serializes populate star', () => {
    expect(stringify({ populate: '*' }))
      .toBe('populate=*')
  })

  it('serializes boolean values', () => {
    expect(stringify({ filters: { title: { $null: true } } }))
      .toBe('filters[title][$null]=true')
  })

  it('skips undefined values', () => {
    expect(stringify({ a: 'keep', b: undefined, c: 'also' }))
      .toBe('a=keep&c=also')
  })

  it('serializes null as string', () => {
    expect(stringify({ value: null }))
      .toBe('value=null')
  })

  it('encodes special characters in values', () => {
    expect(stringify({ filters: { title: { $eq: 'hello world & more' } } }))
      .toBe('filters[title][$eq]=hello%20world%20%26%20more')
  })

  it('handles Strapi v5 status param', () => {
    expect(stringify({ status: 'draft', populate: '*' }))
      .toBe('status=draft&populate=*')
  })

  it('handles complex real-world query', () => {
    const params = {
      filters: { category: { slug: { $eq: 'news' } } },
      sort: ['publishedAt:desc'],
      pagination: { page: 1, pageSize: 10 },
      populate: '*'
    }
    expect(stringify(params)).toBe(
      'filters[category][slug][$eq]=news&sort[0]=publishedAt%3Adesc&pagination[page]=1&pagination[pageSize]=10&populate=*'
    )
  })
})
