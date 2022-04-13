import { useRuntimeConfig } from '#app'

export const useStrapiUrl = (): string => {
  const config = useRuntimeConfig().public
  const version = config.strapi.version
  return version === 'v3' ? config.strapi.url : `${config.strapi.url}${config.strapi.prefix}`
}
