import request from '@/utils/request1'
import {prefix} from './propaganda'

// 营业厅物料宣传单页分公司汇总(审核)
export function verifyList(query) {
    return request({
        url: `${prefix}/verify/list`,
        method: 'get',
        params: query
    })
}

// 修改
export function verifyChanger(data) {
    return request({
        url: `${prefix}/verify/changer`,
        method: 'put',
        data: data
    })
}

// 保存
export function verifySave(data) {
    return request({
        url: `${prefix}/verify/save`,
        method: 'put',
        data: data
    })
}

// 提交
export function verifySubmit(data) {
    return request({
        url: `${prefix}/verify/submit`,
        method: 'put',
        data: data
    })
}