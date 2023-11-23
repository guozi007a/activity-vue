import { get, post, postForm } from './request'
import type { FormConfig, AddActivityFormConfig } from '~/activity/admin/id-types'

// 创建id
export const createIdAPI = (form: FormConfig) => postForm('/v2/createId', form)
// search id
export const searchIdAPI = (userId: number) => get('/v2/searchId', { userId })
// 修改id数据
export const updateIdInfoAPI = (userId: number, paramType: number, key: keyof FormConfig, value: number | string) => post('/v2/updateIdInfo', { userId, paramType, key, value })
// 新增活动
export const addActivityAPI = (formParams: AddActivityFormConfig) => postForm('/v2/addActivity', formParams)
// 获取活动列表
export const getActivityListAPI = (pageSize: number, page: number) => get('/v2/searchActivityList', { pageSize, page })
// 通过分支进行模糊查询
export const getActivityByBranch = (branch: string) => get('/v2/searchActivityByBranch', { branch })