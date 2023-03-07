import type { Strapi4ResponseSingle, Strapi4RequestParams, Strapi4ResponseMany } from '../types/v4'
// eslint-disable-next-line import/named
import { useStrapi4 } from '#imports'

interface StrapiV4Client<T> {
  find<F = T>(contentType: string, params?: Strapi4RequestParams): Promise<Strapi4ResponseMany<F>>
  findOne<F = T>(contentType: string, id?: string | number | Strapi4RequestParams, params?: Strapi4RequestParams): Promise<Strapi4ResponseSingle<F>>
  create<F = T>(contentType: string, data: Partial<F>): Promise<Strapi4ResponseSingle<F>>
  update<F = T>(contentType: string, id: string | number | Partial<F>, data?: Partial<F>): Promise<Strapi4ResponseSingle<F>>
  delete<F = T>(contentType: string, id?: string | number): Promise<Strapi4ResponseSingle<F>>
}

export const useStrapi = <T>(options?: {
  token?: string
}): StrapiV4Client<T> => {
  return useStrapi4(options)
}
