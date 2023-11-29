import { defineStore } from 'pinia'

export interface ProfileConfig {
    userId: number
    username: string
    nickName: string
    avatar: string
    password: string
    money: number
    coupon: number
    gender: number
    identity: number
    userLevel: number
    actorLevel: number
    talent: number
    familyId: number
    familyName: string
    birthday: string
    genderName: string
    identityName: string
    talentName: string
    createDate: number
    isActor: boolean
    isLogin: boolean
    lastLoginDate: number
    token: string
}

export const useLoginStore = defineStore('login', {
    state: () => ({ profile: {} }),
    actions: {},
})