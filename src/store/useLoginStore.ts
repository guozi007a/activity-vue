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
        async login(userId: number, password: string, checked?: boolean) {
            const res = await loginAPI(userId, password)
            if (res.code == "0") {
                ElMessage.success("登录成功")
                if (checked) {
                    localStorage.setItem("ACTIVITY_SESSION_ID", res.data.ACTIVITY_SESSION_ID)
                } else {
                    sessionStorage.setItem("ACTIVITY_SESSION_ID", res.data.ACTIVITY_SESSION_ID)
                }
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
            if (!userId) {
                ElMessage.warning('userId不能为空')
                return
            }
            const res = await logoutAPI(userId)
            if (res.code == "0") {
                localStorage.removeItem('ACTIVITY_SESSION_ID')
                sessionStorage.removeItem('ACTIVITY_SESSION_ID')
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