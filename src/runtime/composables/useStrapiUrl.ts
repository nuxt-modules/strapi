import { useRuntimeConfig } from '#imports'

export const useStrapiUrl = (): string => {
  const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public

  const version = config.strapi.version
  return version === 'v3' ? config.strapi.url : `${config.strapi.url}${config.strapi.prefix}`
}
