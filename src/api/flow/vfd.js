/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-27 10:48:37
 * @LastEditors: CYZ
 * @LastEditTime: 2020-08-11 17:34:09
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

// 跟据节点id获取节点属性详情
export function getFlowProp(flowNodeId) {
    return request({
        url: '/flow/prop/info/' + flowNodeId,
        method: 'get'
    })
}
// 跟据节点id获取节点分配至
export function getFlowPropNodeRole(flowNodeId) {
    return request({
        url: '/flow/prop/node/role/' + flowNodeId,
        method: 'get'
    })
}
// 跟据节点id获取节点属性详情
export function getFlowRoleUser(flowRoleId, unitId) {
    if (typeof(flowRoleId) != 'undefined' && typeof(unitId) != 'undefined') {
        return request({
            url: '/flow/role/user?flowRoleId=' + flowRoleId + '&unitId=' + unitId,
            method: 'get'
        })
    } else if (typeof(flowRoleId) == 'undefined') {
        return request({
            url: '/flow/role/user?unitId=' + unitId,
            method: 'get'
        })
    } else if (typeof(unitId) == 'undefined') {
        return request({
            url: '/flow/role/user?flowRoleId=' + flowRoleId,
            method: 'get'
        })
    }
}
// 新增流程节点属性
export function addFlowProp(data) {
    return request({
        url: '/flow/prop',
        method: 'post',
        data: data
    })
}
// 新增流程节点提醒
export function addFlowPropNotice(data) {
    return request({
        url: '/flow/prop/notice',
        method: 'post',
        data: data
    })
}
// 跟据节点id查看流程节点提醒列表
export function getFlowPropNotice(flowNodeId) {
    return request({
        url: '/flow/prop/notice/info/' + flowNodeId,
        method: 'get'
    })
}
// 修改流程节点属性
export function putFlowProp(data) {
    return request({
        url: '/flow/prop/update',
        method: 'PUT',
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
// 删除节点提醒行
export function delPropNotice(id) {
    return request({
        url: `/flow/prop/delete/notice/${id}`,
        method: 'delete',
    })
}
// 删除节点
export function delProp(flowNodeId) {
    return request({
        url: '/flow/node/delete/' + flowNodeId,
        method: 'delete',
    })
}
// 删除线
export function delLine(fromNodeId, toNodeId) {
    return request({
        url: '/flow/node/delete/line?fromNodeId=' + fromNodeId + "&toNodeId=" + toNodeId,
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