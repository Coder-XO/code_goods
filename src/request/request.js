import axios from "axios";

const instance = axios.create(
    {
        baseURL: "http://kumanxuan1.f3322.net:8001",
        timeout: 5000
    }
)
// 请求拦截 (每次请求前都执行一次请求拦截的代码)
instance.interceptors.request.use(config => {
    // console.log("我被执行了!")   // 拦截函数
    return config   // config此次请求的配置信息
}, err => {
    // 错误信息
    return Promise.reject(err)
})
// 响应拦截 (响应之前拦截)
instance.interceptors.response.use(res => {
    // console.log("我是响应拦截,我被执行了!")
    return res.data
}, err => {
    return Promise.reject(err)
})
export default instance
