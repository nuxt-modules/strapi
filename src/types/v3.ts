import type { StrapiLocale } from '../types'

export interface StrapiError {
  error: string
  message: Record<string, unknown> | Record<string, unknown>[]
  statusCode: number
}

export interface StrapiRequestParams extends Record<string, unknown> {
  _where?: Record<string, unknown>
  _sort?: string | Array<string>
  _limit?: number
  _start?: number
  _publicationState?: 'live' | 'preview'
  _locale?: StrapiLocale
}
