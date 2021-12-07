import type {
  Strapi3RequestParams
} from '../types/v3'
import * as StrapiAuth from '../auth'

export const useStrapi3 = () => {
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
    const client = useStrapiClient()

    return client(`/${contentType}/count`, { method: 'GET', params })
  }

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Strapi3RequestParams} params? - Query parameters
   * @returns Promise<T[]>
   */
  const find = <T>(contentType: string, params?: Strapi3RequestParams): Promise<T[]> => {
    const client = useStrapiClient()

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
  const findOne = <T>(contentType: string, id: string | number, params?: Strapi3RequestParams): Promise<T> => {
    const client = useStrapiClient()

    return client(`/${contentType}/${id}`, { method: 'GET', params })
  }

  /**
   * Create a {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const create = <T>(contentType: string, data: Partial<T>): Promise<T> => {
    const client = useStrapiClient()

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
  const update = <T>(contentType: string, id: string | number | Partial<T>, data?: Partial<T>): Promise<T> => {
    const client = useStrapiClient()

    if (typeof id === 'object') {
      data = id
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
  const _delete = <T>(contentType: string, id?: string | number): Promise<T> => {
    const client = useStrapiClient()

    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'DELETE' })
  }

  return {
    ...StrapiAuth,
    count,
    find,
    findOne,
    create,
    update,
    delete: _delete
  }
}
