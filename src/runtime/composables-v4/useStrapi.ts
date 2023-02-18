import type { Strapi4RequestParams, Strapi4ResponseMany, Strapi4ResponseSingle } from '../types/v4'
import { useStrapiClient, useStrapiVersion } from '#imports'

export const useStrapi = <T>(options?: {
  token?: string,
}) => {
  const client = useStrapiClient(options)
  const version = useStrapiVersion()

  if (version !== 'v4') {
    // eslint-disable-next-line no-console
    console.warn('useStrapi4 is only available for v4')
  }

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Strapi4RequestParams} params? - Query parameters
   * @returns Promise<T>
   */
  const find = <F = T>(contentType: string, params?: Strapi4RequestParams): Promise<Strapi4ResponseMany<F>> => {
    return client(`/${contentType}`, { method: 'GET', params })
  }

  /**
   * Get a specific {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry
   * @param  {Strapi4RequestParams} params? - Query parameters
   * @returns Promise<T>
   */
  const findOne = <F = T>(contentType: string, id?: string | number | Strapi4RequestParams, params?: Strapi4RequestParams): Promise<Strapi4ResponseSingle<F>> => {
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
  const create = <F = T>(contentType: string, data: Partial<F>): Promise<Strapi4ResponseSingle<F>> => {
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
  const update = <F = T>(contentType: string, id: string | number | Partial<F>, data?: Partial<F>): Promise<Strapi4ResponseSingle<F>> => {
    if (typeof id === 'object') {
      data = id
      // @ts-ignore
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
  const _delete = <F = T>(contentType: string, id?: string | number): Promise<Strapi4ResponseSingle<F>> => {
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
