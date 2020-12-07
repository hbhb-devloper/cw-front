import request from '@/utils/request'
import request1 from '@/utils/request1'
import { praseStrEmpty } from "@/utils/ruoyi";
import {prefix} from './system'
var bcrypt = require('bcryptjs');

// 旧·查询管理员详细
// export function getMaintain() {
//     return request({
//         url: '/maintain/info',
//         method: 'get'
//     })
// }
// 新·查询管理员详细
export function getMaintain() {
    return request1({
        url: `${prefix}/maintain/info`,
        method: 'get'
    })
}

// 旧·保存管理员详细
// export function PutMaintain(data) {
//     return request({
//         url: '/maintain/update',
//         method: 'PUT',
//         data: data
//     })
// }
// 新·保存管理员详细
export function PutMaintain(data) {
    return request1({
        url: `${prefix}/maintain`,
        method: 'PUT',
        data: data
    })
}

// 旧·查询用户详细
// export function getUser(userId) {
//     return request({
//         url: '/user/' + userId,
//         method: 'get'
//     })
// }
// 新·查询用户详细
export function getUser(userId) {
    return request1({
        url: `${prefix}/user/` + userId,
        method: 'get'
    })
}

// 旧·更新用户详细
// export function updateUser(data) {
//     return request({
//         url: '/user',
//         method: 'put',
//         data: data
//     })
// }
// 新·更新用户详细
export function updateUser(data) {
    return request1({
        url: `${prefix}/user`,
        method: 'put',
        data: data
    })
}

// 旧·查询用户列表
// export function UserList(query) {
//     return request({
//         url: '/user/list',
//         method: 'get',
//         params: query
//     })
// }
// 新·查询用户列表
export function UserList(query) {
    return request1({
        url: `${prefix}/user/list`,
        method: 'get',
        params: query
    })
}

// 旧·新增用户
// export function adduser(data) {
//     return request({
//         url: '/user',
//         method: 'post',
//         data: data
//     })
// }
// 新·新增用户
export function adduser(data) {
    return request1({
        url: `${prefix}/user`,
        method: 'post',
        data: data
    })
}


// 旧·用户密码重置
// export function resetUserPwd(userId, password) {
//     const data = {
//         userId,
//         password
//     }
//     return request({
//         url: '/system/user/resetPwd',
//         method: 'put',
//         data: data
//     })
// }
// 新·用户密码重置
export function resetUserPwd(userId, password) {
    const data = {
        userId,
        password
    }
    return request1({
        url: `${prefix}/user/resetPwd`,
        method: 'put',
        data: data
    })
}


// 旧·用户状态修改
// export function changeUserStatus(userId, userState) {
//     const data = {
//         userId,
//         userState
//     }
//     return request({
//         url: '/user/' + userId + '/state?userState=' + userState,
//         method: 'PUT',
//     })
// }
// 新·用户状态修改
export function changeUserStatus(userId, userState) {
    const data = {
        userId,
        userState
    }
    return request1({
        url: `${prefix}/user/` + userId + '/state?state=' + userState,
        method: 'PUT',
    })
}

// 旧·查询用户个人信息
// export function getUserProfile() {
//     return request({
//         url: '/user/center-info',
//         method: 'get'
//     })
// }
// 新·查询用户个人信息
export function getUserProfile() {
    return request1({
        url: `${prefix}/user/center-info`,
        method: 'get'
    })
}

// 旧·修改用户个人信息
// export function updateUserProfile(data) {
//     return request({
//         url: '/user/center-info',
//         method: 'put',
//         data: data
//     })
// }
// 新·修改用户个人信息
export function updateUserProfile(data) {
    return request1({
        url: `${prefix}/user/center-info`,
        method: 'put',
        data: data
    })
}

// 旧·用户密码重置
// export function updateUserPwd(data) {
//     return request({
//         url: '/user/pwd',
//         method: 'put',
//         data: data
//     })
// }
// 新·用户密码重置
export function updateUserPwd(data) {
    return request1({
        url: `${prefix}/user/pwd`,
        method: 'put',
        data: data
    })
}

// 旧·用户头像上传
// export function uploadAvatar(data) {
//     return request({
//         url: '/system/user/profile/avatar',
//         method: 'post',
//         data: data
//     })
// }
// 新·用户头像上传
export function uploadAvatar(data) {
    return request1({
        url: `${prefix}/user/profile/avatar`,
        method: 'post',
        data: data
    })
}

// 新·获取当前登录用户的信息
export function getInfo() {
    return request1({
        url: `${prefix}/user/current`,
        method: 'get'
    })
}