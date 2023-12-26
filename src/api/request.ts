import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API,
    timeout: 10000,
    // get请求时，如果params参数是{ids: [1, 2, 3]}这种形式，会被默认转换为ids[]=1&ids[]=2&ids[]=3的形式进行传参
    // 这是错误的传参方式，后端无法识别，所以需要手动进行序列化纠正
    paramsSerializer: function (params) {
        let paramsLine = ''
        for (let k in params) {
            const v = params[k]
            // 排除空参数
            if (v === "" || v === undefined || v === null) {
                continue
            }
            if (Array.isArray(v)) { // 数组
                v.forEach(item => {
                    paramsLine = paramsLine
                        ? (paramsLine + `&${k}=${encodeURIComponent(item)}`)
                        : `${k}=${encodeURIComponent(item)}`
                })
            } else if (Object.prototype.toString.call(v) === "object") { // 普通对象
                paramsLine = paramsLine
                    ? (paramsLine + `&${k}=${encodeURIComponent(JSON.stringify(v))}`)
                    : `${k}=${encodeURIComponent(JSON.stringify(v))}`
            } else { // 普通参数
                paramsLine = paramsLine
                    ? (paramsLine + `&${k}=${encodeURIComponent(v as any)}`)
                    : `${k}=${encodeURIComponent(v as any)}`
            }
        }

        return paramsLine
    }
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    if (config.params?.userId && config.params?.token) { // 如果参数对象中同时存在userId&token，就将它们放入请求头
        config.headers.userId = config.params.userId
        config.headers.token = config.params.token
        delete config.params.userId
        delete config.params.token
    } else if (config.data) {
        if (config.data?.userId && config.data?.token) { // 如果参数对象中同时存在userId&token，就将它们放入请求头
            config.headers.userId = config.data.userId
            config.headers.token = config.data.token
            delete config.data.userId
            delete config.data.token
        }

        // 在post请求中，参数是需要转化的，不能直接传对象。
        // 为了能将userId & token放到请求头，那么在放入前，就不能先转化参数，不然config.data就不是原来的对象了，而是转化后的字符串
        // 所以转化参数就要放到放入请求头后来处理
        // 为了便于根据不同类型来转化不同的data形式，所以在headers中携带了type字段，正式请求前再删除该字段
        if (config.headers?.type === 'json') {
            config.data = JSON.stringify(config.data)
            config.headers['Content-Type'] = "application/json; charset=UTF-8"
        } else if (config.headers?.type === 'form') {
            let result = ''
            for (const [k, v] of Object.entries(config.data)) {
                if (v === null || v === undefined || v === '') {
                    continue
                }
                result = result
                    ? (result + `&${k}=${encodeURIComponent(v as any)}`)
                    : `${k}=${encodeURIComponent(v as any)}`
            }
            config.data = result
            config.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8"
        } else if (config.headers?.type === 'file') {
            const formData = new FormData()
            formData.append("file", config.data)

            config.data = formData
            config.headers['Content-Type'] = "multipart/form-data; charset=UTF-8"
        }
        
        delete config.headers.type
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // console.log('response: ', response)
    if (response.status === 401) { // token无效
        localStorage.removeItem('ACTIVITY_SESSION_ID')
        sessionStorage.removeItem('ACTIVITY_SESSION_ID')
        window.location.reload()
        return
    }
    // 需要后端在header中添加"Access-Control-Expose-Headers"，将content-type和content-disposition暴露给浏览器，前端才能获取到
    // 当值为"application/octet-stream"时，说明要走下载流程，进行单独处理
    const contentType = response.headers['content-type']
    if (contentType === "application/octet-stream") {
        const contentDisposition = response.headers['content-disposition']
        let filename = ''
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            if (filenameMatch.length === 2) {
                filename = filenameMatch[1];

                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', filename)
                document.body.appendChild(link)
                link.click()

                // 开始下载后，就删除下载连接，这不会影响在下载的文件
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
            }
        }
    }
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // console.log('error: ', error)
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

// get download file request
export const download = (url: string, params?: Record<string, any>) => {
    return instance({
        url,
        method: 'get',
        params,
        responseType: 'blob'
    })
}

// get request only for profile
export const getPro = (url: string, params?: Record<string, any>): Promise<ResType> => {
    return instance({
        url,
        method: 'get',
        params,
        headers: {
            ACTIVITY_SESSION_ID: localStorage.getItem('ACTIVITY_SESSION_ID') ?? sessionStorage.getItem('ACTIVITY_SESSION_ID') ?? ''
        }
    })
}

// post common request
export const post = (url: string, params?: Record<string, any>): Promise<ResType> => {
    return instance({
        url,
        method: 'post',
        data: params,
        headers: {
            "type": "json",
        },
    })
}

// post form request
export const postForm = (url: string, params?: Record<string, any>): Promise<ResType> => {
    return instance({
        url,
        method: 'post',
        data: params,
        headers: {
            "type": "form",
        },
    })
}

// post file request
export const postFile = (url: string, file: File): Promise<ResType> => {
    return instance({
        url,
        method: 'post',
        data: file,
        headers: {
            "type": "file",
        },
    })
}