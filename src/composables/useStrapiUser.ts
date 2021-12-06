import { StrapiUser } from '../types'
import { useState } from '#app'

export const useStrapiUser = () => useState<StrapiUser>('strapi_user')
