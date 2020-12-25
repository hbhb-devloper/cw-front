import request from '@/utils/request1'
import {prefix} from './propaganda'

// 查询印刷用品管理列表
export function listPrint(query) {
    return request({
        url: `${prefix}/print/list`,
        method: 'get',
        params: query
    })
}

// 删除印刷品
export function deletePrint(id) {
    return request({
        url: `${prefix}/print/${id}`,
        method: 'delete',
    })
}
// 添加印刷品
export function printToApprove(data) {
    return request({
        url: `${prefix}/print/to-approve`,
        method: 'post',
        data: data
    })
}