import type { Strapi3RequestParams } from '../types/v3'
// @ts-expect-error this import is not available in stubbed version
import { useStrapi3 } from '#imports'

interface StrapiV3Client<T> {
  count(contentType: string, params?: Strapi3RequestParams): Promise<number>
  find<F = T[]>(contentType: string, params?: Strapi3RequestParams): Promise<F>
  findOne<F = T>(contentType: string, id?: string | number | Strapi3RequestParams, params?: Strapi3RequestParams): Promise<F>
  create<F = T>(contentType: string, data: Partial<F>): Promise<F>
  update<F = T>(contentType: string, id: string | number | Partial<F>, data?: Partial<F>): Promise<F>
  delete<F = T>(contentType: string, id?: string | number): Promise<F>
}

export const useStrapi = <T>(): StrapiV3Client<T> => {
  return useStrapi3()
}
