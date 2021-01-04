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


// 导出营业厅物料采购需求汇总
export function goodsExport(data) {
    return request({
        url: `${prefix}/goods/export`,
        method: 'post',
        data: data
    })
}