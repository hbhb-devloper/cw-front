import request from '@/utils/request'
import request1 from '@/utils/request1'
import { prefix } from './system'


// 旧·查询资源树
// export function resourceTree() {
//     return request({
//         url: '/resource/tree-select',
//         method: 'get',
//     })
// }
// 新·查询资源树
export function resourceTree() {
    return request1({
        url: `${prefix}/resource/tree-select`,
        method: 'get',
    })
}

// 旧·查询角色详细
// export function roleMenuTreeselect(roleId) {
//     return request({
//         url: '/resource/role/' + roleId,
//         method: 'get'
//     })
// }
// 新·查询角色详细
export function roleMenuTreeselect(roleId) {
    return request1({
        url: `${prefix}/resource/role/` + roleId,
        method: 'get'
    })
}

// 旧·查询菜单列表
// export function listMenu(query) {
//     return request({
//         url: '/resource/list',
//         method: 'get',
//         params: query
//     })
// }
// 新·查询菜单列表
export function listMenu(query) {
    return request1({
        url: `${prefix}/resource/list`,
        method: 'get',
        params: query
    })
}

// 旧·查询菜单详细
// export function getMenu(menuId) {
//     return request({
//         url: '/resource/' + menuId,
//         method: 'get'
//     })
// }
// 新·查询菜单详细
export function getMenu(menuId) {
    return request1({
        url: `${prefix}/resource/` + menuId,
        method: 'get'
    })
}

// 旧·查询菜单下拉树结构
// export function treeselect() {
//     return request({
//         url: '/resource/tree-select',
//         method: 'get'
//     })
// }
// 新·查询菜单下拉树结构
export function treeselect() {
    return request1({
        url: `${prefix}/resource/tree-select`,
        method: 'get'
    })
}


// 旧·新增菜单
// export function addMenu(data) {
//     return request({
//         url: '/resource',
//         method: 'post',
//         data: data
//     })
// }
// 新·新增菜单
export function addMenu(data) {
    return request1({
        url: `${prefix}/resource`,
        method: 'post',
        data: data
    })
}

// 旧·修改菜单
// export function updateMenu(data) {
//     return request({
//         url: '/resource',
//         method: 'put',
//         data: data
//     })
// }
// 新·修改菜单
export function updateMenu(data) {
    return request1({
        url:`${prefix}/resource`,
        method: 'put',
        data: data
    })
}

// 旧·删除菜单
// export function delMenu(menuId) {
//     return request({
//         url: '/resource/' + menuId,
//         method: 'delete'
//     })
// }
// 新·删除菜单
export function delMenu(menuId) {
    return request1({
        url: `${prefix}/resource/` + menuId,
        method: 'delete'
    })
}