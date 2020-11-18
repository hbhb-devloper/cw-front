import request from '@/utils/request'
import {Encrypt} from '@/utils/AESCrypt'
const client_id = 'web'
const client_secret = '123456'
const grant_type = 'password'
const scope = 'server'

// 登录方法
// export function login(username, password, code, uuid) {
//   return request({
//     url: '/auth/oauth/token',
//     method: 'post',
//     params: { username, password, code, uuid, client_id, client_secret, grant_type, scope }
//   })
// }

// 登录方法
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
    let userInfo=deepClone(data)
    userInfo.password=Encrypt(userInfo.password)
    return request({
        url: '/login',
        method: 'post',
        data: userInfo
    })
}


// 获取用户详细信息
export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    })
}

// 退出方法
export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}

// 获取验证码
export function getCodeImg() {
    return request({
        url: '/captcha',
        method: 'get'
    })
}



// import request from '@/utils/request1'
// import request1 from '@/utils/request'
// import {Encrypt} from '@/utils/AESCrypt'
// const client_id = 'client-app'
// const client_secret = '123456'
// const grant_type = 'password'
// const scope = 'server'

// // 登录方法
// export function check(data) {
//     let info ={
//         captcha:data.captcha,
//         captchaKey:data.captchaKey
//     }
//   return request({
//     url: '/auth/captcha/check',
//     method: 'get',
//     params: info
//   })
// }

// // 登录方法
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
//     // userInfo.password=Encrypt(userInfo.password)
//     userInfo.grant_type =grant_type
//     userInfo.client_id =client_id
//     userInfo.client_secret  =client_secret
//     userInfo.captcha  =undefined
//     userInfo.captchaKey  =undefined
//     userInfo.rememberMe  =undefined
//     return request({
//         url: '/auth/oauth/token',
//         method: 'post',
//         params: userInfo
//     })
// }


// // 获取用户详细信息
// export function getInfo() {
//     return request1({
//         url: '/getInfo',
//         method: 'get'
//     })
// }

// // 退出方法
// export function logout() {
//     return request({
//         url: '/auth/oauth/logout',
//         method: 'DELETE'
//     })
// }

// // 获取验证码
// export function getCodeImg() {
//     return request({
//         url: '/auth/captcha',
//         method: 'get'
//     })
// }
