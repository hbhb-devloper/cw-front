import request from '@/utils/request1'
import {prefix} from './propaganda'

// 添加印刷品
export function printAdd(data) {
    return request({
        url: `${prefix}/print`,
        method: 'post',
        data: data
    })
}

// 修改印刷品
export function printUpdate(data) {
    return request({
        url: `${prefix}/print`,
        method: 'put',
        data: data
    })
}

// 修改印刷品
export function printDetail(id) {
    return request({
        url: `${prefix}/print/${id}`,
        method: 'get',
    })
}

// /print/file/{id}
export function printFileDelete(id) {
    return request({
        url: `${prefix}/print/file/${id}`,
        method: 'delete',
    })
}


// 修改印刷品
export function printMaterials(id) {
    return request({
        url: `${prefix}/print/materials?uuid=${id}`,
        method: 'get',
    })
}

// 获取宣传印刷用品流程详情
export function printFlowList(printId) {
    return request({
        url: `${prefix}/print/flow/list/${printId}`,
        method: 'get',
    })
}


// 获取宣传印刷用品流程详情
export function printFlowApprove(data) {
    return request({
        url: `${prefix}/print/flow/approve`,
        method: 'post',
        data:data
    })
}

