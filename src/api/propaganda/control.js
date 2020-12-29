import request from '@/utils/request1'
import {prefix} from './propaganda'

// 物料制作预算控制列表
export function materialsList() {
    return request({
        url: `${prefix}/materials/budget/list`,
        method: 'get',
    })
}

// 物料制作预算控制列表
export function materialsPut(data) {
    return request({
        url: `${prefix}/materials/budget`,
        method: 'put',
        data:data
    })
}