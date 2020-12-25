import request from '@/utils/request1'
import {prefix} from './propaganda'

// 审核申请列表
export function applicationDetailList(query) {
    return request({
        url: `${prefix}/application/detail/list`,
        method: 'get',
        params: query
    })
}

// 审核申请列表详情
export function applicationDetailHallList(query) {
    return request({
        url: `${prefix}/application/detail/hall/list`,
        method: 'get',
        params: query
    })
}

// 审核 通过/拒接 保存
export function saveApplication(data) {
    return request({
        url: `${prefix}/application/detail`,
        method: 'put',
        data: data
    })
}