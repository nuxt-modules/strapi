import type { FetchOptions } from 'ofetch'
import type { Strapi5ResponseSingle, Strapi5RequestParams, Strapi5ResponseMany } from '../types/v5'
import { useStrapiClient } from '#imports'

interface StrapiV5Client<T> {
  find<F = T>(contentType: string, params?: Strapi5RequestParams<F>, fetchOptions?: FetchOptions): Promise<Strapi5ResponseMany<F>>
  findOne<F = T>(contentType: string, documentId: string, params?: Omit<Strapi5RequestParams<F>, 'filter'>, fetchOptions?: FetchOptions): Promise<Strapi5ResponseSingle<F>>
  create<F = T>(contentType: string, data: Partial<F>, params?: Omit<Strapi5RequestParams<F>, 'filter'>): Promise<Strapi5ResponseSingle<F>>
  update<F = T>(contentType: string, documentId: string | Partial<F>, data?: Partial<F>, params?: Omit<Strapi5RequestParams<F>, 'filter'>): Promise<Strapi5ResponseSingle<F>>
  delete<F = T>(contentType: string, documentId?: string): Promise<Strapi5ResponseSingle<F>>
}

export const useStrapi = <T>(): StrapiV5Client<T> => {
  const client = useStrapiClient()

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Strapi5RequestParams<T>} [params] - Query parameters
   * @returns Promise<T>
   */
  const find = <T>(contentType: string, params?: Strapi5RequestParams<T>, fetchOptions?: FetchOptions): Promise<Strapi5ResponseMany<T>> => {
    return client(`/${contentType}`, { method: 'GET', params, ...fetchOptions })
  }

  /**
   * Get a specific {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string} documentId - ID of entry
   * @param  {Omit<Strapi5RequestParams<T>, 'filter'>} [params] - Query parameters
   * @returns Promise<T>
   */
  const findOne = <T>(contentType: string, documentId: string, params?: Omit<Strapi5RequestParams<T>, 'filter'>, fetchOptions?: FetchOptions): Promise<Strapi5ResponseSingle<T>> => {
    const path = [contentType, documentId].filter(Boolean).join('/')

    return client(path, { method: 'GET', params, ...fetchOptions })
  }

  /**
   * Create a {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Record<string, any>} data - Form data
   * @param  {Omit<Strapi5RequestParams<T>, 'filter'>} [params] - Query parameters
   * @returns Promise<T>
   */
  const create = <T>(contentType: string, data: Partial<T>, params: Omit<Strapi5RequestParams<T>, 'filter'> = {}): Promise<Strapi5ResponseSingle<T>> => {
    return client(`/${contentType}`, { method: 'POST', body: { data }, params })
  }

  /**
   * Update an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string} documentId - ID of entry to be updated
   * @param  {Record<string, any>} data - Form data
   * @param  {Omit<Strapi5RequestParams<T>, 'filter'>} [params] - Query parameters
   * @returns Promise<T>
   */
  const update = <T>(contentType: string, documentId: string | Partial<T>, data?: Partial<T>, params: Omit<Strapi5RequestParams<T>, 'filter'> = {}): Promise<Strapi5ResponseSingle<T>> => {
    if (typeof documentId === 'object') {
      data = documentId
      documentId = undefined
    }

    const path = [contentType, documentId].filter(Boolean).join('/')

    return client(path, { method: 'PUT', body: { data }, params })
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
