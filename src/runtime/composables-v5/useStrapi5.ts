import type { FetchOptions } from 'ofetch'
import type { Strapi5RequestParams } from '../types/v5'
import { useStrapiVersion, useStrapiClient } from '#imports'

/**
 * @deprecated use `useStrapi` for correct types
 */
export const useStrapi5 = () => {
  const client = useStrapiClient()
  const version = useStrapiVersion()
  if (version !== 'v5') {
    console.warn('useStrapi5 is only available for v4')
  }

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Strapi5RequestParams} [params] - Query parameters
   * @returns Promise<T>
   */
  const find = <T>(contentType: string, params?: Strapi5RequestParams, fetchOptions?: FetchOptions): Promise<T> => {
    return client(`/${contentType}`, { method: 'GET', params, ...fetchOptions })
  }

  /**
   * Get a specific {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry
   * @param  {Strapi5RequestParams} [params] - Query parameters
   * @returns Promise<T>
   */
  const findOne = <T>(contentType: string, id?: string | number | Strapi5RequestParams, params?: Strapi5RequestParams, fetchOptions?: FetchOptions): Promise<T> => {
    if (typeof id === 'object') {
      params = id
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'GET', params, ...fetchOptions })
  }

  /**
   * Create a {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const create = <T>(contentType: string, data: Partial<T>): Promise<T> => {
    return client(`/${contentType}`, { method: 'POST', body: { data } })
  }

  /**
   * Update an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be updated
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const update = <T>(contentType: string, id: string | number | Partial<T>, data?: Partial<T>): Promise<T> => {
    if (typeof id === 'object') {
      data = id
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

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
