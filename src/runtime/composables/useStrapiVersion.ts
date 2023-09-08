import { useRuntimeConfig } from '#imports'

export const useStrapiVersion = (): string => {
  const config = process.server ? useRuntimeConfig() : useRuntimeConfig().public

  return config.strapi.version
}
