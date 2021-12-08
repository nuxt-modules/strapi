import type { StrapiLocale } from '../types'

export interface Strapi4Error {
  error: {
    status: number
    name: string
    message: string
    details: Record<string, unknown>
  }
}

export interface PaginationByPage {
  page: number
  pageSize: number
  withCount?: boolean
}

export interface PaginationByOffset {
  start: number
  limit: number
  withCount?: boolean
}

export interface Strapi4RequestParams {
  fields?: Array<string>
  populate?: string | Array<string>
  sort?: string | Array<string>
  pagination?: PaginationByOffset | PaginationByPage
  filters?: Record<string, unknown>
  publicationState?: 'live' | 'preview'
  locale?: StrapiLocale
}

export interface Strapi4ResponseData<T> {
  id: number,
  attributes: T,
  meta: Record<string, unknown>
}

export interface Strapi4Response<T> {
  data: Strapi4ResponseData<T> | Strapi4ResponseData<T>[],
  meta: Record<string, unknown>
}
