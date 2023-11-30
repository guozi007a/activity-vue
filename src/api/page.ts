import { post, getPro } from "./request";

// 登录
export const loginAPI = (userId: number, password: string) => post('/v3/login', { userId, password })
// 退出登录
export const logoutAPI = (userId: number) => post('/v3/logout', { userId })
// 获取profile
export const profileInfoAPI = () => getPro('/v3/profileInfo')