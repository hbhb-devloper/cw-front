import request from '@/utils/request1'
import {prefix} from './propaganda'

// 营业厅物料分公司汇总（政企/市场部）
export function applicationGoods(query) {
    return request({
        url: `${prefix}/application/detail/goods`,
        method: 'get',
        params: query
    })
}

// 营业厅物料分公司汇总（政企/市场部）
export function applicationDetailInfoList(query) {
    return request({
        url: `${prefix}/application/detail/info/list`,
        method: 'get',
        params: query
    })
}

