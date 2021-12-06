import type {
  StrapiRequestParams,
  StrapiResponse
} from '../types/v4'
import * as StrapiAuth from '../auth'

export const useStrapi4 = () => {
  const version = useStrapiVersion()
  if (version !== 'v4') {
    // eslint-disable-next-line no-console
    console.warn('useStrapi4 is only available for v4')
  }

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {StrapiRequestParams} params? - Query parameters
   * @returns Promise<StrapiResponse<T>>
   */
  const find = <T>(contentType: string, params?: StrapiRequestParams): Promise<StrapiResponse<T>> => {
    const client = useStrapiClient()

    return client(`/${contentType}`, { method: 'GET', params })
  }

  /**
   * Get a specific {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry
   * @param  {StrapiRequestParams} params? - Query parameters
   * @returns Promise<StrapiResponse<T>>
   */
  const findOne = <T>(contentType: string, id: string | number, params?: StrapiRequestParams): Promise<StrapiResponse<T>> => {
    const client = useStrapiClient()

    return client(`/${contentType}/${id}`, { method: 'GET', params })
  }

  /**
   * Create a {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<StrapiResponse<T>>
   */
  const create = <T>(contentType: string, data: Partial<T>): Promise<StrapiResponse<T>> => {
    const client = useStrapiClient()

    return client(`/${contentType}`, { method: 'POST', body: { data } })
  }

  /**
   * Update an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be updated
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<StrapiResponse<T>>
   */
  const update = <T>(contentType: string, id: string | number | Partial<T>, data?: Partial<T>): Promise<StrapiResponse<T>> => {
    const client = useStrapiClient()

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
   * @returns Promise<StrapiResponse<T>>
   */
  const _delete = <T>(contentType: string, id?: string | number): Promise<StrapiResponse<T>> => {
    const client = useStrapiClient()

    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'DELETE' })
  }

  return {
    ...StrapiAuth,
    find,
    findOne,
    create,
    update,
    delete: _delete
  }
}
