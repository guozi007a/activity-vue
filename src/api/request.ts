import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API,
    timeout: 10000,
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    if (config.params?.userId && config.params?.token) {
        config.headers.userId = config.params.userId
        config.headers.token = config.params.token
        delete config.params.userId
        delete config.params.token
    } else if (config.data?.userId && config.data?.token) {
        config.headers.userId = config.data.userId
        config.headers.token = config.data.token
        delete config.data.userId
        delete config.data.token
    }
    config.withCredentials = true
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// response type
interface ResType {
    code: string
    message: string
    data: any
}

// get request
export const get = (url: string, params?: Record<string, any>): Promise<ResType> => {
    return instance({
        url,
        method: 'get',
        params
    })
}

// post common request
export const post = (url: string, params?: Record<string, any>): Promise<ResType> => {
    return instance({
        url,
        method: 'post',
        data: params ? JSON.stringify(params) : {},
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })
}

// post form request
export const postForm = (url: string, params?: Record<string, any>): Promise<ResType> => {
    let result = ''
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            if (v === null || v === undefined || v === '') {
                continue
            }
            result = result
                ? (result + `&${k}=${encodeURIComponent(v)}`)
                : `${k}=${encodeURIComponent(v)}`
        }
    }
    return instance({
        url,
        method: 'post',
        data: result,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
    })
}