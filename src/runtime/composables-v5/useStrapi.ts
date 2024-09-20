import type { FetchOptions } from 'ofetch'

import type { Strapi5ResponseSingle, Strapi5RequestParams, Strapi5ResponseMany } from '../types/v5'
import { useStrapiVersion, useStrapiClient } from '#imports'

interface StrapiV5Client<T> {
  find<F = T>(contentType: string, params?: Strapi5RequestParams): Promise<Strapi5ResponseMany<F>>
  findOne<F = T>(contentType: string, docuemntId?: string | Strapi5RequestParams, params?: Strapi5RequestParams): Promise<Strapi5ResponseSingle<F>>
  create<F = T>(contentType: string, data: Partial<F>): Promise<Strapi5ResponseSingle<F>>
  update<F = T>(contentType: string, docuemntId: string | Partial<F>, data?: Partial<F>): Promise<Strapi5ResponseSingle<F>>
  delete<F = T>(contentType: string, docuemntId?: string): Promise<Strapi5ResponseSingle<F>>
}

export const useStrapi = <T>(): StrapiV5Client<T> => {
  const client = useStrapiClient()
  const version = useStrapiVersion()
  if (version !== 'v5') {
    console.warn('useStrapi5 is only available for v5')
  }

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Strapi5RequestParams} [params] - Query parameters
   * @returns Promise<T>
   */
  const find = <T>(contentType: string, params?: Strapi5RequestParams, fetchOptions?: FetchOptions): Promise<Strapi5ResponseMany<T>> => {
    return client(`/${contentType}`, { method: 'GET', params, ...fetchOptions })
  }

  /**
   * Get a specific {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string} docuemntId - ID of entry
   * @param  {Strapi5RequestParams} [params] - Query parameters
   * @returns Promise<T>
   */
  const findOne = <T>(contentType: string, docuemntId?: string | Strapi5RequestParams, params?: Strapi5RequestParams, fetchOptions?: FetchOptions): Promise<Strapi5ResponseSingle<T>> => {
    if (typeof docuemntId === 'object') {
      params = docuemntId
      docuemntId = undefined
    }

    const path = [contentType, docuemntId].filter(Boolean).join('/')

    return client(path, { method: 'GET', params, ...fetchOptions })
  }

  /**
   * Create a {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const create = <T>(contentType: string, data: Partial<T>): Promise<Strapi5ResponseSingle<T>> => {
    return client(`/${contentType}`, { method: 'POST', body: { data } })
  }

  /**
   * Update an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string} docuemntId - ID of entry to be updated
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const update = <T>(contentType: string, docuemntId: string | Partial<T>, data?: Partial<T>): Promise<Strapi5ResponseSingle<T>> => {
    if (typeof docuemntId === 'object') {
      data = docuemntId
      docuemntId = undefined
    }

    const path = [contentType, docuemntId].filter(Boolean).join('/')

    return client(path, { method: 'PUT', body: { data } })
  }

  /**
   * Delete an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be deleted
   * @returns Promise<T>
   */
  const _delete = <T>(contentType: string, id?: string | number): Promise<T> => {
    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'DELETE' })
  }

  return {
    find,
    findOne,
    create,
    update,
    delete: _delete
  }
}
