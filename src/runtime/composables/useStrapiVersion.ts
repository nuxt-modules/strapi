import { useRuntimeConfig } from '#app'

export const useStrapiVersion = (): string => {
  const config = useRuntimeConfig()
  return config.strapi.version
}
