import type { Strapi3RequestParams } from '../types/v3'
import { useStrapiVersion, useStrapiClient } from '#imports'

export const useStrapi = <T>(options?: {
  token?: string,
}) => {
  const client = useStrapiClient(options)
  const version = useStrapiVersion()

  if (version !== 'v3') {
    // eslint-disable-next-line no-console
    console.warn('useStrapi3 is only available for v3')
  }

  /**
   * Count {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Strapi3RequestParams} params? - Query parameters
   * @returns Promise<number>
   */
  const count = (contentType: string, params?: Strapi3RequestParams): Promise<number> => {
    return client(`/${contentType}/count`, { method: 'GET', params })
  }

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Strapi3RequestParams} params? - Query parameters
   * @returns Promise<T>
   */
  const find = <F = T[]>(contentType: string, params?: Strapi3RequestParams): Promise<F> => {
    return client(`/${contentType}`, { method: 'GET', params })
  }

  /**
   * Get a specific {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry
   * @param  {Strapi3RequestParams} params? - Query parameters
   * @returns Promise<T>
   */
  const findOne = <F = T>(contentType: string, id?: string | number | Strapi3RequestParams, params?: Strapi3RequestParams): Promise<F> => {
    if (typeof id === 'object') {
      params = id
      // @ts-ignore
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'GET', params })
  }

  /**
   * Create a {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const create = <F = T>(contentType: string, data: Partial<F>): Promise<F> => {
    return client(`/${contentType}`, { method: 'POST', body: data })
  }

  /**
   * Update an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be updated
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const update = <F = T>(contentType: string, id: string | number | Partial<F>, data?: Partial<F>): Promise<F> => {
    if (typeof id === 'object') {
      data = id
      // @ts-ignore
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'PUT', body: data })
  }

  /**
   * Delete an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be deleted
   * @returns Promise<T>
   */
  const _delete = <F = T>(contentType: string, id?: string | number): Promise<F> => {
    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'DELETE' })
  }

  return {
    count,
    find,
    findOne,
    create,
    update,
    delete: _delete
  }
}
