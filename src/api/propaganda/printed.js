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