export const useStrapiUrl = (): string => {
  const config = useRuntimeConfig()
  const version = config.strapi.version
  return version === 'v3' ? config.strapi.url : `${config.strapi.url}${config.strapi.prefix}`
}
