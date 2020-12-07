import request from '@/utils/request1'
import {prefix} from './propaganda'

// 新增物料活动产品列表
export function goodsList(query) {
    return request({
        url: `${prefix}/goods/list`,
        method: 'get',
        params: query
    })
}