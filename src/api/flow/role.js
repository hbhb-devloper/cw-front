/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-23 10:24:22
 * @LastEditors: CYZ
 * @LastEditTime: 2020-07-24 18:26:08
 */
import request from '@/utils/request'



// 查询流程类型列表
export function listRole(query) {
    return request({
        url: '/flow/role/list',
        method: 'get',
        params: query
    })
}

// 查询流程类型详细
export function getFlow(FlowId) {
    return request({
        url: '/flow/' + FlowId,
        method: 'get'
    })
}

// 新增流程类型
export function addRole(data) {
    return request({
        url: '/flow/role',
        method: 'post',
        data: data
    })
}
// 修改岗位
export function updateRole(data) {
    return request({
        url: '/flow/role',
        method: 'put',
        data: data
    })
}

// 删除单位
export function delarr(RoleId) {
    return request({
        url: '/flow/role/' + RoleId,
        method: 'delete',
    })
}

// 查询流程类型详细
export function UNroleMenuTreeselect(roleId) {
    return request({
        url: '/flow' + roleId,
        method: 'get'
    })
}

// 绑定流程角色用户
export function updateRoleUser(flowRoleId, userIds) {
    return request({
        url: '/flow/role/user/' + flowRoleId,
        method: 'put',
        data: userIds
    })
}