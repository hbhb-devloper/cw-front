import request from '@/utils/request1'
import {prefix} from './propaganda'

// 营业厅物料采购需求汇总
export function goodsPurchase(query) {
    return request({
        url: `${prefix}/goods/purchase`,
        method: 'get',
        params: query
    })
}
