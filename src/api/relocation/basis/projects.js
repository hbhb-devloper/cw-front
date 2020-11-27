/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-11-24 15:28:06
 */

import request from '@/utils/request1'
import {prefix} from '../relocation'



// 查询迁改基础信息列表
export function listProject(query) {
     function deepClone(obj) {
        let result = typeof obj.splice === "function" ? [] : {};
        if (obj && typeof obj === 'object') {
            for (let key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    result[key] = deepClone(obj[key]); //如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
                } else {
                    result[key] = obj[key]; //如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
                }
    
            }
            return result;
        }
        return obj;
    }
    let queryParams=deepClone(query)
    if (queryParams.contractNum) {
        queryParams.contractNum = encodeURI(
            queryParams.contractNum
        );
      }
    return request({
        url: `${prefix}/project/list`,
        method: 'get',
        params: queryParams
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