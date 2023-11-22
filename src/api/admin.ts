import { get, post, postForm } from './request'
import type { FormConfig } from '~/activity/admin/id-types'

// 创建id
export const createIdAPI = (form: FormConfig) => postForm('/v2/createId', form)
// search id
export const searchIdAPI = (userId: number) => get('/v2/searchId', { userId })
// 修改id数据
export const updateIdInfoAPI = (userId: number, paramType: number, key: keyof FormConfig, value: number | string) => post('/v2/updateIdInfo', { userId, paramType, key, value })