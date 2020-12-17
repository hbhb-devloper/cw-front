/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-24 18:29:57
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-17 16:57:35
 */
import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from './flow'


// 查询流程类型列表
export function listFlowRole(query) {
    return request1({
        url: `${prefix}/role/user/list`,
        method: 'get',
        params: query
    })
}

// 查询流程类型列表
export function listFlowRoles(query) {
    return request1({
        url: `${prefix}/role/select`,
        method: 'get',
        params: query
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
export function delRoleUser(id) {
    return request1({
        url: `${prefix}/role/user/${id}`,
        method: 'delete',
    })
}
