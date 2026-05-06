import type { MetaResponsePaginationByOffset, MetaResponsePaginationByPage, PaginationByOffset, PaginationByPage, StrapiLocale, StrapiRequestParamField, StrapiRequestParamPopulate, StrapiRequestParamSort, StrapiFilterRequestParam } from '.'

export interface Strapi5Error {
  data: null
  error: {
    status: number
    name: string
    message: string
    details: Record<string, unknown>
  }
}

export interface Strapi5RequestParams<T> {
  fields?: Array<StrapiRequestParamField<T>>
  populate?: Strapi5RequestPopulateParam<T>
  sort?: StrapiRequestParamSort<T> | Array<StrapiRequestParamSort<T>>
  pagination?: PaginationByOffset | PaginationByPage
  filters?: StrapiFilterRequestParam<T>
  status?: 'published' | 'draft'
  locale?: StrapiLocale | null
}

export type Strapi5RequestPopulateParams<T> = Pick<Strapi5RequestParams<T>, 'fields' | 'sort' | 'populate' | 'filters'>

// Unified type for Strapi populate, combining both string paths and nested objects.
export type Strapi5RequestPopulateParam<T>
  = | '*' // Populate all relations.
    | { [K in keyof T]?: // Nested object population.
      T[K] extends object
        ? T[K] extends Array<infer I>
          ? Strapi5RequestPopulateParam<I> | Strapi5RequestPopulateParams<I>
          : Strapi5RequestPopulateParam<T[K]> | Strapi5RequestPopulateParams<T[K]>
        : never
    }
    | StrapiRequestParamPopulate<T> // String paths like "field.subfield".
    | Array<StrapiRequestParamPopulate<T>> // Array of string paths.

export interface StrapiSystemFields {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  locale?: string
}

export type Strapi5ResponseData<T> = T & StrapiSystemFields

export interface Strapi5ResponseSingle<T> {
  data: Strapi5ResponseData<T>
  meta: Strapi5ResponseMeta
}

export interface Strapi5ResponseMany<T> {
  data: Strapi5ResponseData<T>[]
  meta: Strapi5ResponseMeta
}

export interface Strapi5ResponseMeta {
  pagination?: MetaResponsePaginationByPage | MetaResponsePaginationByOffset
  [key: string]: unknown
}
