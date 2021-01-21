import request from '@/utils/request1'
import { prefix } from './report'

// 报表管理内容分页列表
export function reportList(query) {
    return request({
        url: `${prefix}/report/list`,
        method: 'get',
        params: query
    })
}
// 添加报表信息
export function reportAdd(data) {
    return request({
        url: `${prefix}/report`,
        method: 'post',
        data: data
    })
}
// 删除报表信息
export function reportDelete(data) {
    return request({
        url: `${prefix}/report/move`,
        method: 'delete',
        data: data
    })
}
// 获取宣传物料设计流程详情
export function reportFlowList(reportId) {
    return request({
        url: `${prefix}/report/flow/list/${reportId}`,
        method: 'get',
    })
}
// 获取宣传物料设计流程详情
export function reportFlowApprove(data) {
    return request({
        url: `${prefix}/report/flow/approve`,
        method: 'post',
        data:data
    })
}
// 报表管理内容详情附件列表
export function reportInfo(query) {
    return request({
        url: `${prefix}/report/info`,
        method: 'get',
        params: query
    })
}