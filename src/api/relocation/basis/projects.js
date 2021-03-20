/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-10 18:24:43
 */

import request from '@/utils/request1'
import {prefix} from '../relocation'



// 查询迁改基础信息列表
export function listProject(query) {
    return request({
        url: `${prefix}/project/list`,
        method: 'get',
        params: query
    })
}

// 查看迁改基础信息详情
export function ProjectDetail(id) {
    return request({
        url:  `${prefix}/project/${id}`,
        method: 'get',
    })
}

// 新增迁改基础信息
export function addProject(data) {
    return request({
        url:  `${prefix}/project`,
        method: 'post',
        data: data
    })
}

// 修改迁改基础信息
export function updateProject(data) {
    return request({
        url:  `${prefix}/project`,
        method: 'put',
        data: data
    })
}

// 删除迁改基础信息
export function delarr(ProjectId) {
    return request({
        url:  `${prefix}/project/${ProjectId}`,
        method: 'delete',
    })
}