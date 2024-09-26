import type { MetaResponsePaginationByOffset, MetaResponsePaginationByPage, PaginationByOffset, PaginationByPage, StrapiLocale } from '.'

export interface Strapi5Error {
  error: {
    status: number
    name: string
    message: string
    details: Record<string, unknown>
  }
}

export interface Strapi5RequestParams {
  fields?: Array<string>
  populate?: string | Array<string> | object
  sort?: string | Array<string>
  pagination?: PaginationByOffset | PaginationByPage
  filters?: Record<string, unknown>
  publicationState?: 'live' | 'preview'
  locale?: StrapiLocale
}

export interface Strapi5SystemFields {
  documentId: string
  locale?: StrapiLocale
}

export type Strapi5ResponseData<T> = Strapi5SystemFields & T

export interface Strapi5ResponseSingle<T> {
  data: Strapi5ResponseData<T>
  meta: Strapi5ResponseMeta
}

export interface Strapi5ResponseMany<T> {
  data: Strapi5ResponseData<T>[]
  meta: Strapi5ResponseMeta
}

export interface Strapi5ResponseMeta {
  pagination: MetaResponsePaginationByPage | MetaResponsePaginationByOffset
  [key: string]: unknown
}
