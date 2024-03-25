import { useRuntimeConfig } from '#imports'

export const useStrapiVersion = (): string => {
  const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public

  return config.strapi.version
}
