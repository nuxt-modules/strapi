import type { Strapi5ResponseSingle, Strapi5RequestParams, Strapi5ResponseMany } from '../types/v5'
import { useStrapi5 } from '#imports'

interface StrapiV5Client<T> {
  find<F = T>(contentType: string, params?: Strapi5RequestParams): Promise<Strapi5ResponseMany<F>>
  findOne<F = T>(contentType: string, id?: string | number | Strapi5RequestParams, params?: Strapi5RequestParams): Promise<Strapi5ResponseSingle<F>>
  create<F = T>(contentType: string, data: Partial<F>): Promise<Strapi5ResponseSingle<F>>
  update<F = T>(contentType: string, id: string | number | Partial<F>, data?: Partial<F>): Promise<Strapi5ResponseSingle<F>>
  delete<F = T>(contentType: string, id?: string | number): Promise<Strapi5ResponseSingle<F>>
}

export const useStrapi = <T>(): StrapiV5Client<T> => {
  return useStrapi5() as StrapiV5Client<T>
}
