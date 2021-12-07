import { useCookie } from '#app'

export const useStrapiToken = () => useCookie<string | null>('strapi_jwt')
