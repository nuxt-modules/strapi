import { joinURL } from 'ufo'
import { useRuntimeConfig } from '#imports'

export const useStrapiMedia = (path: string): string => {
  const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public

  return joinURL(config.strapi.url, path)
}
