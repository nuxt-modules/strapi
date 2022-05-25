import { useRuntimeConfig } from '#app'
import { useStrapiClient } from './useStrapiClient'

export const useStrapiGraphQL = () => {
  const client = useStrapiClient()
  const config = useRuntimeConfig()

  return <T> (query: string): Promise<T> => {
    return client('/graphql', {
      method: 'POST',
      body: { query },
      headers: {
        accept: 'application/json'
      },
      baseURL: config.strapi.url
    })
  }
}
