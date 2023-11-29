import { defineStore } from 'pinia'
import { loginAPI, logoutAPI, profileInfoAPI } from '~/api/page'

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
    actions: {
        async login(userId: number, password: string) {
            const res = await loginAPI(userId, password)
            if (res.code == "0") {
                ElMessage.success("登录成功")
                window.location.reload()
            } else {
                ElMessage.error(res.message)
            }
        },
        async logout(userId: number) {
            const res = await logoutAPI(userId)
            if (res.code == "0") {
                window.location.reload()
            } else {
                ElMessage.error(res.message)
            }
        },
        async getProfile() {
            const res = await profileInfoAPI()
            this.profile = res.data ?? {}
        }
    },
})