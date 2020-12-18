import request from '@/utils/request1'
import {prefix} from './propaganda'

// 营业厅物料宣传单页分公司汇总(审核)
export function verifySingle(query) {
    return request({
        url: `${prefix}/verify/single/list`,
        method: 'get',
        params: query
    })
}
// 营业厅物料业务单式分公司汇总(审核)
export function verifySimplex(query) {
    return request({
        url: `${prefix}/verify/simplex/list`,
        method: 'get',
        params: query
    })
}