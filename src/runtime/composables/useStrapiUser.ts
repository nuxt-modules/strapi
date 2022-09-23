import type { Ref } from 'vue'
import { useState } from '#app'
import type { StrapiUser } from '../types'

export const useStrapiUser = <T = StrapiUser> (): Ref<T> => useState<T>('strapi_user')
