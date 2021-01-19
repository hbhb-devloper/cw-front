import request from '@/utils/request'
import request1 from '@/utils/request1'
import { prefix } from './flow'


// 查询流程类型列表
export function listType(query) {
    return request1({
        url: `${prefix}/type/list`,
        method: 'get',
        params: query
    })
}
// 获取流程类型名称
export function listTypeName(query) {
    return request1({
        url: `${prefix}/names`,
        method: 'get',
        params: query
    })
}
// 新增流程类型
export function addType(data) {
    return request1({
        url: `${prefix}/type`,
        method: 'post',
        data: data
    })
}
// 修改流程类型
export function updateType(data) {
    return request1({
        url: `${prefix}/type`,
        method: 'put',
        data: data
    })
}

// 删除流程类型
export function delFlowType(flowTypeId) {
    return request1({
        url: `${prefix}/type/${flowTypeId}`,
        method: 'delete',
    })
}

// 根据流程类型id查询流程类型详情
export function listTypeById(query) {
    return request1({
        url: `${prefix}/type/id`,
        method: 'get',
        params: query
    })
}

