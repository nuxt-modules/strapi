import { useRuntimeConfig } from '#app'
import { print } from 'graphql'
import type { DocumentNode } from 'graphql'
import { useStrapiClient } from './useStrapiClient'

export const useStrapiGraphQL = () => {
  const client = useStrapiClient()
  const config = useRuntimeConfig()

  return <T> (query: string|DocumentNode, variables?: { [key: string]: unknown }): Promise<T> => {
    const queryAsString = typeof query === 'string' ? query : print(query)
    return client('/graphql', {
      method: 'POST',
      body: {
        query: queryAsString,
        variables
      },
      headers: {
        accept: 'application/json'
      },
      baseURL: config.strapi.url
    })
  }
}
