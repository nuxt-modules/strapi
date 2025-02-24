import type { MetaResponsePaginationByOffset, MetaResponsePaginationByPage, PaginationByOffset, PaginationByPage, StrapiLocale, StrapiRequestParamField, StrapiRequestParamPopulate, StrapiRequestParamSort, StrapiFilterRequestParam } from '.'

export interface Strapi5Error {
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
export type Strapi5RequestPopulateParam<T> =
  | '*' // Populate all relations.
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
  documentId: string
  locale?: string
}

export type Strapi5ResponseData<T> = T extends object
  ? T extends Array<infer U>
    ? Array<Strapi5ResponseData<U>> // Handle arrays
    : T extends Record<string, unknown>
      ? { [K in keyof T]: Strapi5ResponseData<T[K]> } & StrapiSystemFields
      : T
  : T

// Pagination interface for optional pagination info in the meta field
export interface StrapiResponseMetaPagination {
  page: number
  pageSize: number
}

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
