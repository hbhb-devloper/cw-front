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

