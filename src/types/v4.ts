import type { StrapiLocale } from '../types'

export interface StrapiError {
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

export interface StrapiRequestParams {
  fields?: Array<string>
  populate?: string | Array<string>
  sort?: string | Array<string>
  pagination?: PaginationByOffset | PaginationByPage
  filters?: Record<string, unknown>
  publicationState?: 'live' | 'preview'
  locale?: StrapiLocale
}

export interface StrapiResponse<T> {
  data: {
    id: number,
    attributes: T,
    meta: Record<string, unknown>
  },
  meta: Record<string, unknown>
}
