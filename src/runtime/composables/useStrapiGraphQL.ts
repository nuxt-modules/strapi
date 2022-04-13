import { useRuntimeConfig } from '#app'
import { useStrapiClient } from './useStrapiClient'

export const useStrapiGraphQL = () => {
  const client = useStrapiClient()
  const config = useRuntimeConfig().public

  return <T> (query: string): Promise<T> => {
    return client('/graphql', { method: 'POST', body: { query }, baseURL: config.strapi.url })
  }
}
