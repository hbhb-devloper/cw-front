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


// 营业厅物料分公司汇总（政企/市场部）
export function applicationDetailStateList(query) {
    return request({
        url: `${prefix}/application/detail/state`,
        method: 'get',
        params: query
    })
}

// 发起审批
export function applicationToApprove(data) {
    return request({
        url: `${prefix}/application/detail/to-approve`,
        method: 'post',
        data: data
    })
}
// 营业厅物料分公司汇总（政企/市场部）
export function applicationFlow(batchNum,unitId) {
    return request({
        url: `${prefix}/application/flow?batchNum=${batchNum}&unitId=${unitId}`,
        method: 'get',
    })
}
// 发起审批
export function SubmitApprove(data) {
    return request({
        url: `${prefix}/application/detail/approve`,
        method: 'post',
        data: data
    })
}