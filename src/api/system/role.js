import request from '@/utils/request'



// 查询角色列表
export function pageRole(query) {
    return request({
        url: '/role/page',
        method: 'get',
        params: query
    })
}
// 查询角色列表
export function listRole(roleType) {
    return request({
        url: '/role/list?roleType=' + roleType,
        method: 'get',
    })
}
// 查询角色详细
export function getRole(roleId) {
    return request({
        url: '/role/' + roleId,
        method: 'get'
    })
}

// 新增角色
export function addRole(data) {
    return request({
        url: '/role',
        method: 'post',
        data: data
    })
}
// 修改角色
export function updateRole(data) {
    return request({
        url: '/role',
        method: 'put',
        data: data
    })
}

// 用户状态修改
export function changeRoleStatus(roleId, roleState) {
    const data = {
        roleId,
        roleState
    }
    return request({
        url: '/role/' + roleId + '/state?roleState=' + roleState,
        method: 'PUT',
    })
}