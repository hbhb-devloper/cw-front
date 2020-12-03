import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from './system'


// 旧·查询角色列表
// export function pageRole(query) {
//     return request({
//         url: '/role/page',
//         method: 'get',
//         params: query
//     })
// }
// 新·查询角色列表
export function pageRole(query) {
    return request1({
        url: `${prefix}/role/page`,
        method: 'get',
        params: query
    })
}

// 旧·查询角色列表
// export function listRole(roleType) {
//     return request({
//         url: '/role/list?roleType=' + roleType,
//         method: 'get',
//     })
// }
// 新·查询角色列表
export function listRole(roleType) {
    return request1({
        url: `${prefix}/role/list?roleType=` + roleType,
        method: 'get',
    })
}

// 旧·查询角色详细
// export function getRole(roleId) {
//     return request({
//         url: '/role/' + roleId,
//         method: 'get'
//     })
// }
// 新·查询角色详细
export function getRole(roleId) {
    return request1({
        url: `${prefix}/role/` + roleId,
        method: 'get'
    })
}

// 旧·新增角色
// export function addRole(data) {
//     return request({
//         url: '/role',
//         method: 'post',
//         data: data
//     })
// }
// 新·新增角色
export function addRole(data) {
    return request1({
        url: `${prefix}/role`,
        method: 'post',
        data: data
    })
}

// 旧·修改角色
// export function updateRole(data) {
//     return request({
//         url: '/role',
//         method: 'put',
//         data: data
//     })
// }
// 新·修改角色
export function updateRole(data) {
    return request1({
        url: `${prefix}/role`,
        method: 'put',
        data: data
    })
}

// 旧·用户状态修改
// export function changeRoleStatus(roleId, roleState) {
//     const data = {
//         roleId,
//         roleState
//     }
//     return request({
//         url: '/role/' + roleId + '/state?roleState=' + roleState,
//         method: 'PUT',
//     })
// }
// 新·用户状态修改
export function changeRoleStatus(roleId, roleState) {
    const data = {
        roleId,
        roleState
    }
    return request1({
        url: `${prefix}/role/` + roleId + '/state?state=' + roleState,
        method: 'PUT',
    })
}