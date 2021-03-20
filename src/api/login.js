import request1 from '@/utils/request1'
import request from '@/utils/request'
import { Encrypt } from '@/utils/AESCrypt'
import { prefix } from './auth'
import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
const grant_type = 'password'
const client_id = 'zhcw'
const client_secret = '123456'

// 新-获取验证码
export function getCodeImg() {
    return request1({
        url: `${prefix}/captcha`,
        method: 'get'
    })
}

// 旧-获取验证码
// export function getCodeImg() {
//     return request({
//         url: '/captcha',
//         method: 'get'
//     })
// }

// 验证码校验
export function check(data) {
    let info = {
        captcha: data.captcha,
        captchaKey: data.captchaKey
    }
    return request1({
        url: `${prefix}/captcha/check`,
        method: 'get',
        params: info
    })
}

// 新-登录方法
export function login(data) {
    function deepClone(obj) {
        let result = typeof obj.splice === "function" ? [] : {};
        if (obj && typeof obj === 'object') {
            for (let key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    result[key] = deepClone(obj[key]); //如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
                } else {
                    result[key] = obj[key]; //如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
                }

            }
            return result;
        }
        return obj;
    }
    let userInfo = deepClone(data)
    return request1({
        method: 'post',
        url: `${process.env.VUE_APP_GATEWAY_API}${prefix}/oauth/token`,
        data: "grant_type=" + grant_type + "&username=" + userInfo.username + "&password=" + encodeURIComponent(Encrypt(userInfo.password)),
        headers: {
            'Authorization': 'Basic ' + window.btoa(client_id + ":" + client_secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 旧-登录方法
// export function login(data) {
//     function deepClone(obj) {
//         let result = typeof obj.splice === "function" ? [] : {};
//         if (obj && typeof obj === 'object') {
//             for (let key in obj) {
//                 if (obj[key] && typeof obj[key] === 'object') {
//                     result[key] = deepClone(obj[key]); //如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
//                 } else {
//                     result[key] = obj[key]; //如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
//                 }

//             }
//             return result;
//         }
//         return obj;
//     }
//     let userInfo=deepClone(data)
//     userInfo.password=Encrypt(userInfo.password)
//     return request({
//         url: '/login',
//         method: 'post',
//         data: userInfo
//     })
// }

// 获取用户详细信息
export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    })
}

// 新-退出方法
export function logout() {
    return request1({
        url: `${prefix}/oauth/logout`,
        method: 'DELETE'
    })
}

// 旧-退出方法
// export function logout() {
//     return request({
//         url: '/logout',
//         method: 'get'
//     })
// }

// 重置密码链接发送至邮箱
export function forgotPassword(query) {
    return request1({
        url: `${prefix}/oauth/forgot/password`,
        method: 'get',
        params:query
    })
}
// 通过邮箱重置密码
export function pwdEdit(data) {
    function deepClone(obj) {
        let result = typeof obj.splice === "function" ? [] : {};
        if (obj && typeof obj === 'object') {
            for (let key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    result[key] = deepClone(obj[key]); //如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
                } else {
                    result[key] = obj[key]; //如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
                }

            }
            return result;
        }
        return obj;
    }
    let userInfo = deepClone(data)
    userInfo.newPwd=Encrypt(userInfo.newPwd)
    // userInfo.key=userInfo.key.replace(/\%20/g, '+')
    userInfo.key=decodeURIComponent(userInfo.key).replace(/ /g, '+')
    // userInfo.key=decodeURIComponent(userInfo.key)
    delete userInfo.checkPwd
    return request1({
        url: `${prefix}/oauth/pwd`,
        method: 'put',
        data:userInfo
    })
}
