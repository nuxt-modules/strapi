import type { Ref } from 'vue'
import { useState } from '#app'
import type { StrapiUser } from '../types'

export const useStrapiUser = (): Ref<StrapiUser> => useState<StrapiUser>('strapi_user')
