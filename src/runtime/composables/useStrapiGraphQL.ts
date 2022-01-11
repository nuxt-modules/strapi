import { useStrapiClient } from './useStrapiClient'
import { useRuntimeConfig } from '#app'

export const useStrapiGraphQL = () => {
  const client = useStrapiClient()
  const config = useRuntimeConfig()

  return <T> (query: string): Promise<T> => {
    return client('/graphql', { method: 'POST', body: { query }, baseURL: config.strapi.url })
  }
}
