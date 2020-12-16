/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-24 18:29:57
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-16 11:00:20
 */
import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from './flow'


// 查询流程类型列表
export function listFlowRole(query) {
    return request1({
        url: `${prefix}/role/info`,
        method: 'get',
        params: query
    })
}

// 查询流程类型列表
export function listFlowRoles(query) {
    return request1({
        url: `${prefix}/role/list/select`,
        method: 'get',
        params: query
    })
}
// 查询流程类型详细
export function getFlow(FlowId) {
    return request1({
        url: `${prefix}` + FlowId,
        method: 'get'
    })
}

// 新增流程类型
export function addFlow(data) {
    return request1({
        url: `${prefix}`,
        method: 'post',
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

// 删除单位
export function delRoleUser(flowRoleUserId) {
    return request1({
        url: `${prefix}/role/flow-role-user/` + flowRoleUserId,
        method: 'delete',
    })
}
