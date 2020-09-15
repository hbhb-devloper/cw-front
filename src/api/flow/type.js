import request from '@/utils/request'



// 查询流程类型列表
export function listType(query) {
    return request({
        url: '/flow/type/list',
        method: 'get',
        params: query
    })
}
// 查询模块类型列表
export function listModule() {
    return request({
        url: '/dict/module',
        method: 'get',
    })
}
// 查询流程类型详细
export function getType(TypeId) {
    return request({
        url: '/type/' + TypeId,
        method: 'get'
    })
}

// 新增流程类型
export function addType(data) {
    return request({
        url: '/flow/type',
        method: 'post',
        data: data
    })
}
// 修改岗位
export function updateType(data) {
    return request({
        url: '/flow/type',
        method: 'put',
        data: data
    })
}

// 删除单位
export function delFlowType(flowTypeId) {
    return request({
        url: `/flow/type/${flowTypeId}`,
        method: 'delete',
    })
}

// 查询流程类型详细
export function UNroleMenuTreeselect(roleId) {
    return request({
        url: '/Type/role/' + roleId,
        method: 'get'
    })
}

// 查询资源树
export function resourceTreeByUN() {
    return request({
        url: '/Type/tree-select',
        method: 'get',
    })
}