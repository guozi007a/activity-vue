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
export const getActivityByBranchAPI = (branch: string) => get('/v2/searchActivityByBranch', { branch })

// 删除分支
export const removeActivityAPI = (branch: string) => post('/v2/removeActivity', { branch })

// 充值秀币/欢乐券 1:1000
export interface ChargeConfig {
    userId: number
    payId?: number
    money?: number
    coupon?: number
}
export const chargeAPI = (params: ChargeConfig) => post('/v2/charge', params)

// 充值记录列表
export interface ChargeLogsConfig {
    userId?: number
    payId?: number
    dateStart?: number
    dateEnd?: number
    page: number
    pageSize: number
}
export const getChargeLogsAPI = (params: ChargeLogsConfig) => get('/v2/chargeList', params)
// 删除指定充值记录
export const delChargeLogAPI = (id: number) => post('/v2/chargeDel', { id })