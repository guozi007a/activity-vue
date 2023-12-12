import { get, post } from './request'

export interface SignInfoParam {
    userId: number
    token: string
}

export interface TurnCardParam extends SignInfoParam {
    position: number
}

// 获取签到信息
export const getSignInfoAPI = (params: SignInfoParam) => get('/activity/2399/signInfo', params)

// 签到
export const SignAPI = (params: SignInfoParam) => post('/activity/2399/sign', params)

// 翻卡信息
export const cardInfoAPI = (params: SignInfoParam) => get('/activity/2399/cardInfo', params)

// 翻卡
export const turnCardAPI = (params: TurnCardParam) => get('/activity/2399/turnCard', params)