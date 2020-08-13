import request from '@/utils/request'



// 查询部门列表
export function listUnit(query) {
    return request({
        url: '/unit/list',
        method: 'get',
        params: query
    })
}

// 查询角色详细
export function getUnit(unitId) {
    return request({
        url: '/unit/' + unitId,
        method: 'get'
    })
}

// 新增角色
export function addUnit(data) {
    return request({
        url: '/unit',
        method: 'post',
        data: data
    })
}
// 修改岗位
export function updateUnit(data) {
    return request({
        url: '/unit',
        method: 'put',
        data: data
    })
}

// 删除单位
export function delarr(unitId) {
    return request({
        url: '/unit/' + unitId,
        method: 'delete',
    })
}

// 查询角色详细
export function UNroleMenuTreeselect(roleId) {
    return request({
        url: '/unit/role/' + roleId,
        method: 'get'
    })
}

// 查询资源树
export function resourceTreeByUN() {
    return request({
        url: '/unit/tree-select',
        method: 'get',
    })
}