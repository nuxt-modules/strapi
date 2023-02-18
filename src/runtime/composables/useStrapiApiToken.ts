import { useRuntimeConfig } from '#app'

export const useStrapiApiToken = () => {
  const config = useRuntimeConfig()

  if (config.strapi.apiToken === '') {
    // eslint-disable-next-line no-console
    console.warn('Missing `STRAPI_API_TOKEN` in `env`')
  }

  return config.strapi.apiToken
}
