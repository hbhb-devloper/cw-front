import request from '@/utils/request'



// 查询资源树
export function resourceTree() {
    return request({
        url: '/resource/tree-select',
        method: 'get',
    })
}

// 查询角色详细
export function roleMenuTreeselect(roleId) {
    return request({
        url: '/resource/role/' + roleId,
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