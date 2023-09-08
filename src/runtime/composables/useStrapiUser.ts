import type { Ref } from 'vue'
import type { StrapiUser } from '../types'
import { useState } from '#imports'

export const useStrapiUser = <T = StrapiUser> (): Ref<T> => useState<T>('strapi_user')
