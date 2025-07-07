import { joinURL } from 'ufo'
import { useRuntimeConfig } from '#imports'

/**
 * Safely handles Strapi media URLs for both development and production environments.
 *
 * In development or self hosted, Strapi typically returns relative paths (e.g., '/uploads/image.jpg')
 * In production (Strapi Cloud), Strapi returns full URLs (e.g., 'https://domain.media.strapiapp.com/image.jpg')
 *
 * This composable automatically detects the URL type and handles it appropriately:
 * - Full URLs are returned as-is
 * - Relative paths are processed
 *
 * @param path - The media URL from Strapi (can be relative or absolute)
 * @returns The complete, accessible media URL
 *
 * @example
 * // Development: '/uploads/favicon.svg' → 'http://localhost:1337/uploads/favicon.svg'
 * // Production: 'https://domain.media.strapiapp.com/favicon.svg' → 'https://domain.media.strapiapp.com/favicon.svg'
 */
export const useStrapiMedia = (path: string): string => {
  try {
    const url = new URL(path)
    return url.href
  } catch (_e) { // eslint-disable-line @typescript-eslint/no-unused-vars
    // Not a valid absolute URL, treat as relative
  }

  const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public

  return joinURL(config.strapi.url, path)
}
