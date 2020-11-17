import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { tansParams } from "@/utils/ruoyi";
import { console } from "vuedraggable/src/util/helper";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_GATEWAY_API,
  // 超时
  timeout: 20000
})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // const code = res.status;
    const code = res.code;
    const message = errorCode[code] || res.message || errorCode['default']
    // if (code === 1000) {
    if (code === '00000') {
      return res.data
    } else if (code === 'A0002' ||code === 'A0204') {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === '10001') {
      Notification({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    } else {
      Notification.error({
        message: message
      })
      return Promise.reject('error')
    }
  },
  error => {
    Notification.error({
      message: "系统出错啦！",
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
