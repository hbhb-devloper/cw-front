import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from './flow'

// 查询流程详细
export function getProject(FlowId) {
    return request1({
        url: `${prefix}/vfd/` + FlowId,
        method: 'get'
    })
}

// 新增流程类型
export function addProject(data) {
    return request1({
        url: `${prefix}/vfd`,
        method: 'post',
        data: data
    })
}
// 修改流程
export function updateFlow(data) {
    return request1({
        url: `${prefix}/`,
        method: 'put',
        data: data
    })
}

// 删除单位
export function delarr(FlowId) {
    return request1({
        url: `${prefix}/` + FlowId,
        method: 'delete',
    })
}

