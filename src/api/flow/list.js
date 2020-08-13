/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-20 18:22:09
 * @LastEditors: CYZ
 * @LastEditTime: 2020-08-01 11:10:19
 */
import request from '@/utils/request'



// 查询流程类型列表
export function listFlow(query) {
    return request({
        url: '/flow/list',
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
export function delarr(FlowId) {
    return request({
        url: '/flow/' + FlowId,
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