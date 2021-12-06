import type { StrapiOptionsVersion } from '../types'

export const useStrapiVersion = (): StrapiOptionsVersion => {
  const config = useRuntimeConfig()
  return config.strapi.version
}
