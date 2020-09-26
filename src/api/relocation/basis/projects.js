/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-09-26 18:07:13
 */

import request from '@/utils/request'



// 查询迁改基础信息列表
export function listProject(query) {
    return request({
        url: '/relocation/project/list',
        method: 'get',
        params: query
    })
}

export function compensationSate() {
    return request({
        url: 'dict/relocation/compensation_sate',
        method: 'get',
    })
}
// 新增迁改基础信息
export function addProject(data) {
    return request({
        url: '/relocation/project',
        method: 'post',
        data: data
    })
}

// 修改迁改基础信息
export function updateProject(data) {
    return request({
        url: '/relocation/project/update',
        method: 'put',
        data: data
    })
}

// 删除迁改基础信息
export function delarr(ProjectId) {
    return request({
        url: '/relocation/project/delete/' + ProjectId,
        method: 'delete',
    })
}