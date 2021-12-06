import { useCookie } from '#app'

export const useStrapiToken = () => useCookie<string>('strapi_jwt')
