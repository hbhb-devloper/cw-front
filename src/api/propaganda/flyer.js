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

// 通过时间得到第几月的第几次
export function goodsTime(time) {
    return request({
        url: `${prefix}/goods/setting/time?time=${time}`,
        method: 'get',
    })
}

// 通过时间得到第几月的第几次
export function goodsApply(data) {
    return request({
        url: `${prefix}/goods/apply`,
        method: 'post',
        data:data
    })
}