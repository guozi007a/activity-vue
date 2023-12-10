import { get } from "./request";

// 检查服务器时间和本地时间
export const checkTimeAPI = () => get("/test/checkTime")