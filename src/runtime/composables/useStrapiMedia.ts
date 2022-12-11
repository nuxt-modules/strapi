import { useRuntimeConfig } from '#app'

export const useStrapiMedia = (url: string): string => {
  const config = useRuntimeConfig()

  return config.strapi.url + url
}
