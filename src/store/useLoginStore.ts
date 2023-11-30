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

const initProfile: Partial<ProfileConfig> = {}

export const useLoginStore = defineStore('login', {
    state: () => ({
        profile: initProfile,
        isProfileLoaded: false, // profile文件是否加载完成，为了解决加载完成前后造成的dom频闪问题
    }),
    actions: {
        async login(userId: number, password: string) {
            const res = await loginAPI(userId, password)
            if (res.code == "0") {
                ElMessage.success("登录成功")
                let timer = 0
                timer = setTimeout(() => {
                    window.location.reload()
                    window.clearTimeout(timer)
                }, 300)
            } else {
                ElMessage.error(res.message)
            }
        },
        async logout(userId: number) {
            const res = await logoutAPI(userId)
            if (res.code == "0") {
                let timer = 0
                timer = setTimeout(() => {
                    window.location.reload()
                    window.clearTimeout(timer)
                }, 300)
            } else {
                ElMessage.error(res.message)
            }
        },
        async getProfile() {
            this.isProfileLoaded = false
            const res = await profileInfoAPI()
            this.profile = res.data ?? initProfile
            this.isProfileLoaded = true
        }
    },
})