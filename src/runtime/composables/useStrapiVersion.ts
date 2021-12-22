import type { StrapiOptionsVersion } from '../../types'
import { useRuntimeConfig } from '#app'

export const useStrapiVersion = (): StrapiOptionsVersion => {
  const config = useRuntimeConfig()
  return config.strapi.version
}
