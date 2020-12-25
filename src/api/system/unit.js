import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from './system'



// 旧·查询部门列表
// export function listUnit(query) {
//     return request({
//         url: '/unit/list',
//         method: 'get',
//         params: query
//     })
// }
// 新·查询部门列表
export function listUnit(query) {
    return request1({
        url: `${prefix}/unit/list`,
        method: 'get',
        params: query
    })
}

// 旧·查询部门详细
// export function getUnit(unitId) {
//     return request({
//         url: '/unit/' + unitId,
//         method: 'get'
//     })
// }
// 新·查询部门详细
export function getUnit(unitId) {
    return request1({
        url: `${prefix}/unit/` + unitId,
        method: 'get'
    })
}

// 旧·新增部门
// export function addUnit(data) {
//     return request({
//         url: '/unit',
//         method: 'post',
//         data: data
//     })
// }
// 新·新增部门
export function addUnit(data) {
    return request1({
        url: `${prefix}/unit`,
        method: 'post',
        data: data
    })
}

// 旧·修改岗位
// export function updateUnit(data) {
//     return request({
//         url: '/unit',
//         method: 'put',
//         data: data
//     })
// }
// 新·修改岗位
export function updateUnit(data) {
    return request1({
        url: `${prefix}/unit`,
        method: 'put',
        data: data
    })
}

// 旧·删除单位
// export function delarr(unitId) {
//     return request({
//         url: '/unit/' + unitId,
//         method: 'delete',
//     })
// }
// 新·删除单位
export function delarr(unitId) {
    return request1({
        url: `${prefix}/unit/` + unitId,
        method: 'delete',
    })
}

// 旧·查询部门详细
// export function UNroleMenuTreeselect(roleId) {
//     return request({
//         url: '/unit/role/' + roleId,
//         method: 'get'
//     })
// }
// 新·查询部门详细
export function UNroleMenuTreeselect(roleId) {
    return request1({
        url: `${prefix}/unit/role/` + roleId,
        method: 'get'
    })
}

// 旧·查询资源树
// export function resourceTreeByUN() {
//     return request({
//         url: '/unit/tree-select',
//         method: 'get',
//     })
// }
// 新·查询资源树
export function resourceTreeByUN() {
    return request1({
        url: `${prefix}/unit/tree-select`,
        method: 'get',
    })
}

// 旧·查询复选框
// export function getCheckBox() {
//     return request({
//         url: `/unit/short-name/list`,
//         method: 'get'
//     })
// }
// 新·查询复选框
export function getCheckBox() {
    return request1({
        url: `${prefix}/unit/short-name/list`,
        method: 'get'
    })
}

