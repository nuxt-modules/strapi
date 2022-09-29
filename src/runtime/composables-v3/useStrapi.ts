import type { Strapi3RequestParams } from '../types/v3'
// eslint-disable-next-line import/named
import { useStrapi3 } from '#imports'

interface StrapiV3Client<T> {
  count(contentType: string, params?: Strapi3RequestParams): Promise<number>
  find<F = T[]>(contentType: string, params?: Strapi3RequestParams): Promise<F>
  findOne<F = T>(contentType: string, id: string | number, params?: Strapi3RequestParams): Promise<F>
  create<F = T>(contentType: string, data: Partial<F>): Promise<F>
  update<F = T>(contentType: string, id: string | number | Partial<F>, data?: Partial<F>): Promise<F>
  delete<F = T>(contentType: string, id?: string | number): Promise<F>
}

export const useStrapi = <T>(): StrapiV3Client<T> => {
  return useStrapi3()
}
