import { useRuntimeConfig } from '#app'
import { print } from 'graphql'
import type { DocumentNode } from 'graphql'
import { useStrapiClient } from './useStrapiClient'

export const useStrapiGraphQL = () => {
  const client = useStrapiClient()
  const config = useRuntimeConfig().public

  return <T> (query: string|DocumentNode, variables?: { [key: string]: unknown }): Promise<T> => {
    return client('/graphql', {
      method: 'POST',
      body: {
        query: typeof query === 'string' ? query : print(query),
        variables
      },
      headers: {
        accept: 'application/json'
      },
      baseURL: config.strapi.url
    })
  }
}
