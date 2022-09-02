import type { Strapi4ResponseSingle, Strapi4RequestParams, Strapi4ResponseMany } from '../types/v4'
import { useStrapi4 } from '#imports'

interface StrapiV4Client<T> {
  find<F = T>(contentType: string, params?: Strapi4RequestParams): Promise<Strapi4ResponseMany<F>>
  findOne<F = T>(contentType: string, id: string | number, params?: Strapi4RequestParams): Promise<Strapi4ResponseSingle<F>>
  create<F = T>(contentType: string, data: Partial<F>): Promise<Strapi4ResponseSingle<F>>
  update<F = T>(contentType: string, data: Partial<F>): Promise<Strapi4ResponseSingle<F>>
  delete<F = T>(contentType: string, id: string | number | Partial<F>, data?: Partial<F>): Promise<Strapi4ResponseSingle<F>>
}

export const useStrapi = <T>(): StrapiV4Client<T> => {
  return useStrapi4()
}
