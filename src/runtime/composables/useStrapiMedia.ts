import { joinURL } from 'ufo'
import { useRuntimeConfig } from '#imports'

export const useStrapiMedia = (path: string): string => {
  const config = process.server ? useRuntimeConfig() : useRuntimeConfig().public

  return joinURL(config.strapi.url, path)
}
