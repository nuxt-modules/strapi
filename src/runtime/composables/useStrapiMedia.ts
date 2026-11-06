import { joinURL } from 'ufo'
import { useRuntimeConfig } from '#imports'

export const useStrapiMedia = (path: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const config = useRuntimeConfig().public

  return joinURL(config.strapi.url, path)
}
