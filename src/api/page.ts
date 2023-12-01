import { post, getPro } from "./request";

// 登录
export const loginAPI = (userId: number, password: string, checked?: boolean) => post('/v3/login', { userId, password, checked })
// 退出登录
export const logoutAPI = (userId: number) => post('/v3/logout', { userId })
// 获取profile
export const profileInfoAPI = () => getPro('/v3/profileInfo')