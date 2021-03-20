/*
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-07-20 18:22:09
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-17 14:02:38
 */
import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from './flow'


export function FlowTypeList(query){
  return request1({
    url:`${prefix}/type/select`,
    method:'get',
    params: query
  })
}
// 查询流程类型列表
export function listFlow(query) {
    return request1({
        url: `${prefix}/list`,
        method: 'get',
        params: query
    })
}

// 查询流程类型详细
export function getFlow(FlowId) {
    return request1({
        url: `${prefix}/` + FlowId,
        method: 'get'
    })
}

// 新增流程类型
export function addFlow(data) {
    return request1({
        url: `${prefix}/`,
        method: 'post',
        data: data
    })
}
// 修改岗位
export function updateFlow(data) {
    return request1({
        url: `${prefix}/`,
        method: 'put',
        data: data
    })
}

// 删除单位
export function delarr(FlowId) {
    return request1({
        url: `${prefix}/`+ FlowId,
        method: 'delete',
    })
}
