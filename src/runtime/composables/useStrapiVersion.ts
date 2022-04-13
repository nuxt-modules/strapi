import { useRuntimeConfig } from '#app'

export const useStrapiVersion = (): string => {
  const config = useRuntimeConfig().public
  return config.strapi.version
}
