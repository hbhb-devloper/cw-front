import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";
var bcrypt = require('bcryptjs');

// 查询管理员详细
export function getMaintain() {
    return request({
        url: '/maintain/info',
        method: 'get'
    })
}
// 保存管理员详细
export function PutMaintain(data) {
    return request({
        url: '/maintain/update',
        method: 'PUT',
        data: data
    })
}
// 查询用户详细
export function getUser(userId) {
    return request({
        url: '/user/' + userId,
        method: 'get'
    })
}

// 更新用户详细
export function updateUser(data) {
    return request({
        url: '/user',
        method: 'put',
        data: data
    })
}

// 查询用户列表
export function UserList(query) {
    return request({
        url: '/user/list',
        method: 'get',
        params: query
    })
}
// 新增用户
export function adduser(data) {
    return request({
        url: '/user',
        method: 'post',
        data: data
    })
}


// 更新用户状态

// export function changeUserStatus(userId, state) {
//     return request({
//         url: '/user/' + userId + '/state',
//         method: 'delete',
//         data: {
//             userId: userId,
//             userState: state
//         }
//     })
// }
// 用户密码重置
export function resetUserPwd(userId, password) {
    const data = {
        userId,
        password
    }
    return request({
        url: '/system/user/resetPwd',
        method: 'put',
        data: data
    })
}

// 用户状态修改
export function changeUserStatus(userId, userState) {
    const data = {
        userId,
        userState
    }
    return request({
        url: '/user/' + userId + '/state?userState=' + userState,
        method: 'PUT',
    })
}

// 查询用户个人信息
export function getUserProfile() {
    return request({
        url: '/user/center-info',
        method: 'get'
    })
}

// 修改用户个人信息
export function updateUserProfile(data) {
    return request({
        url: '/user/center-info',
        method: 'put',
        data: data
    })
}

// 用户密码重置
export function updateUserPwd(data) {
    return request({
        url: '/user/pwd',
        method: 'put',
        data: data
    })
}

// 用户头像上传
export function uploadAvatar(data) {
    return request({
        url: '/system/user/profile/avatar',
        method: 'post',
        data: data
    })
}
