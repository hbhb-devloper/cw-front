/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-24 18:29:57
 * @LastEditors: CYZ
 * @LastEditTime: 2020-08-04 14:44:23
 */
import request from '@/utils/request'



// 查询流程类型列表
export function listFlowRole(query) {
    return request({
        url: '/flow/role/info',
        method: 'get',
        params: query
    })
}

// 查询流程类型列表
export function listFlowRoles(query) {
    return request({
        url: '/flow/role/list/select',
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
export function addFlow(data) {
    return request({
        url: '/flow',
        method: 'post',
        data: data
    })
}
// 修改岗位
export function updateFlow(data) {
    return request({
        url: '/flow',
        method: 'put',
        data: data
    })
}

// 删除单位
export function delRoleUser(flowRoleUserId) {
    return request({
        url: '/flow/role/flow-role-user/' + flowRoleUserId,
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