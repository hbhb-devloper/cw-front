/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-23 10:24:22
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-17 10:16:10
 */
import request from '@/utils/request'
import request1 from '@/utils/request1'
import { prefix } from './flow'


// 查询流程类型列表
export function listRole(query) {
    return request1({
        url: `${prefix}/role/list`,
        method: 'get',
        params: query
    })
}


// 新增流程类型
export function addRole(data) {
    return request1({
        url: `${prefix}/role`,
        method: 'post',
        data: data
    })
}
// 修改岗位
export function updateRole(data) {
    return request1({
        url: `${prefix}/role`,
        method: 'put',
        data: data
    })
}

// 删除单位
export function delarr(RoleId) {
    return request1({
        url: `${prefix}/role/` + RoleId,
        method: 'delete',
    })
}



// 绑定流程角色用户
export function updateRoleUser(flowRoleId, userIds) {
    return request1({
        url: `${prefix}/role/user/` + flowRoleId,
        method: 'put',
        data: userIds
    })
}