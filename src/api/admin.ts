import { get, postForm } from './request'
import type { FormConfig } from '~/activity/admin/id-types'

// 创建id
export const createIdAPI = (form: FormConfig) => postForm('/v2/createId', form)
// search id
export const searchIdAPI = (userId: number) => get('/v2/searchId', { userId })