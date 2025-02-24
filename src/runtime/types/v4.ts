import type { StrapiFilterRequestParam, StrapiLocale, StrapiRequestParamField, StrapiRequestParamPopulate, StrapiRequestParamSort } from '.'

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

export interface Strapi4RequestParams<T> {
  fields?: Array<StrapiRequestParamField<T>>
  populate?: Strapi4RequestPopulateParam<T>
  sort?: StrapiRequestParamSort<T> | Array<StrapiRequestParamSort<T>>
  pagination?: PaginationByOffset | PaginationByPage
  filters?: StrapiFilterRequestParam<T>
  publicationState?: 'live' | 'preview'
  locale?: StrapiLocale
}

export type Strapi4RequestPopulateParams<T> = Pick<Strapi4RequestParams<T>, 'fields' | 'sort' | 'populate' | 'filters'>

// Unified type for Strapi populate, combining both string paths and nested objects.
export type Strapi4RequestPopulateParam<T> =
  | '*' // Populate all relations.
  | { [K in keyof T]?: // Nested object population.
    T[K] extends object
      ? T[K] extends Array<infer I>
        ? Strapi4RequestPopulateParam<I> | Strapi4RequestPopulateParams<I>
        : Strapi4RequestPopulateParam<T[K]> | Strapi4RequestPopulateParams<T[K]>
      : never
  }
  | StrapiRequestParamPopulate<T> // String paths like "field.subfield".
  | Array<StrapiRequestParamPopulate<T>> // Array of string paths.

export interface Strapi4ResponseData<T> {
  id: number
  attributes: T
  meta: Record<string, unknown>
}

export interface Strapi4Response<T> {
  data: Strapi4ResponseData<T> | Strapi4ResponseData<T>[]
  meta: Strapi4ResponseMeta
}

export interface Strapi4ResponseSingle<T> {
  data: Strapi4ResponseData<T>
  meta: Strapi4ResponseMeta
}

export interface Strapi4ResponseMany<T> {
  data: Strapi4ResponseData<T>[]
  meta: Strapi4ResponseMeta
}

export interface Strapi4ResponseMeta {
  pagination: MetaResponsePaginationByPage | MetaResponsePaginationByOffset
  [key: string]: unknown
}

export interface MetaResponsePaginationByPage {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface MetaResponsePaginationByOffset {
  start: number
  limit: number
  total: number
}
