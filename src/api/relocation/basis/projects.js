/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-09-23 14:47:33
 */

import request from '@/utils/request'



// 查询迁改基础信息列表
export function listProject(query) {
    return request({
        url: '/project/list',
        method: 'get',
        params: query
    })
}


// 新增迁改基础信息
export function addProject(data) {
    return request({
        url: '/project',
        method: 'post',
        data: data
    })
}

// 修改迁改基础信息
export function updateProject(data) {
    return request({
        url: '/project',
        method: 'put',
        data: data
    })
}

// 删除迁改基础信息
export function delarr(ProjectId) {
    return request({
        url: '/project/' + ProjectId,
        method: 'delete',
    })
}