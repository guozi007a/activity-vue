import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API,
    timeout: 10000,
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
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

// get request
export const get = (url: string, params?: Record<string, any>) => {
    return instance({
        url,
        method: 'get',
        params
    })
}

// post request
export const post = (url: string, params?: Record<string, any>) => {
    return instance({
        url,
        method: 'post',
        data: params
    })
}