/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-27 10:48:37
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-17 17:17:31
 */

import request from '@/utils/request'
import request1 from '@/utils/request1'
import { prefix } from './flow'


// 跟据节点id获取节点属性详情
export function getFlowProp(flowNodeId) {
    return request1({
        url: `${prefix}/node/prop/info?flowNodeId=${flowNodeId}`,
        method: 'get'
    })
}
// 跟据节点id获取节点分配至
export function getFlowPropNodeRole(flowNodeId) {
    return request1({
        url: `${prefix}/node/prop/assigner?flowId=${flowNodeId}`,
        method: 'get'
    })
}
// 跟据节点id获取节点属性详情
export function getFlowRoleUser(flowRoleId, unitId) {
    // if (typeof(flowRoleId) != 'undefined' && typeof(unitId) != 'undefined') {
        return request1({
            url: `${prefix}/role/user/select?flowRoleId=` + flowRoleId + '&unitId=' + unitId,
            method: 'get'
        })
    // } else if (typeof(flowRoleId) == 'undefined') {
    //     return request1({
    //         url: `${prefix}/role/user?unitId=` + unitId,
    //         method: 'get'
    //     })
    // } else if (typeof(unitId) == 'undefined') {
    //     return request1({
    //         url: `${prefix}/role/user?flowRoleId=` + flowRoleId,
    //         method: 'get'
    //     })
    // }
}
// 新增流程节点属性
export function addFlowProp(data) {
    return request1({
        url: `${prefix}/prop`,
        method: 'post',
        data: data
    })
}
// 新增流程节点提醒
export function addFlowPropNotice(data) {
    return request1({
        url: `${prefix}/node/notice`,
        method: 'post',
        data: data
    })
}
// 跟据节点id查看流程节点提醒列表
export function getFlowPropNotice(flowNodeId) {
    return request1({
        url: `${prefix}/node/notice/list?flowNodeId=${flowNodeId}`,
        method: 'get'
    })
}
// 修改流程节点属性
export function putFlowProp(data) {
    return request1({
        url: `${prefix}/node/prop`,
        method: 'PUT',
        data: data
    })
}

// 修改岗位
export function updateFlow(data) {
    return request1({
        url: `${prefix}`,
        method: 'put',
        data: data
    })
}
// 删除节点提醒行
export function delPropNotice(id) {
    return request1({
        url: `${prefix}/node/notice/${id}`,
        method: 'delete',
    })
}
// 删除节点
export function delProp(flowNodeId) {
    return request1({
        url: `${prefix}/node/delete/` + flowNodeId,
        method: 'delete',
    })
}
// 删除线
export function delLine(fromNodeId, toNodeId) {
    return request1({
        url: `${prefix}/node/delete/line?fromNodeId=` + fromNodeId + "&toNodeId=" + toNodeId,
        method: 'delete',
    })
}
