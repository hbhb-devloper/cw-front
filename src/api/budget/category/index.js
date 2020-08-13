/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-07 17:50:31
 * @LastEditors: CYZ
 * @LastEditTime: 2020-07-21 16:42:50
 */
import request from '@/utils/request'
// 查询流程类型列表
export function listMonth(query) {
    return request({
        url: '/month/check/list',
        method: 'get',
        params: query
    })
}

// 修改岗位
export function updateBudget(data) {
    return request({
        url: '/budget/adjust',
        method: 'put',
        data: data
    })
}

// 新增项目类别
export function AddBudget(data) {
    return request({
        url: '/budget',
        method: 'post',
        data: data
    })
}

// 修改项目类别
export function PutBudget(data) {
    return request({
        url: '/budget',
        method: 'put',
        data: data
    })
}

// 新增科目类别
export function AddBudgetItem(data) {
    return request({
        url: '/budget/item',
        method: 'post',
        data: data
    })
}

// 修改科目类别
export function PutBudgetItem(data) {
    return request({
        url: '/budget/item',
        method: 'PUT',
        data: data
    })
}
// 通过科目id获得科目详情
export function GetBudgetItem(itemId) {
    return request({
        url: '/budget/item/' + itemId,
        method: 'Get',
    })
}
// 通过预算id获得预算详情
export function GetBudget(itemId) {
    return request({
        url: '/budget/' + itemId,
        method: 'Get',
    })
}

// 通过预算id删除预算详情
export function DelBudget(itemId) {
    return request({
        url: '/budget/' + itemId,
        method: 'Delete',
    })
}

// 通过科目id删除科目详情
export function DelBudgetItem(itemId) {
    return request({
        url: '/budget/item/' + itemId,
        method: 'Delete',
    })
}


// 获得科目列表
export function GetBudgetProject() {
    return request({
        url: '/budget/item',
        method: 'Get',
    })
}