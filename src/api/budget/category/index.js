/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-07 17:50:31
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-28 15:26:50
 */
import request from '@/utils/request1'
import {prefix} from '../budget'

// 修改岗位
export function updateBudget(data) {
    return request({
        url: `${prefix}/adjust`,
        method: 'put',
        data: data
    })
}

// 新增项目类别
export function AddBudget(data) {
    return request({
        url: `${prefix}/`,
        method: 'post',
        data: data
    })
}

// 修改项目类别
export function PutBudget(data) {
    return request({
        url: `${prefix}/`,
        method: 'put',
        data: data
    })
}

// 新增科目类别
export function AddBudgetItem(data) {
    return request({
        url: `${prefix}/item`,
        method: 'post',
        data: data
    })
}

// 修改科目类别
export function PutBudgetItem(data) {
    return request({
        url: `${prefix}/item`,
        method: 'PUT',
        data: data
    })
}
// 通过科目id获得科目详情
export function GetBudgetItem(itemId) {
    return request({
        url: `${prefix}/item/` + itemId,
        method: 'Get',
    })
}
// 通过预算id获得预算详情
export function GetBudget(itemId) {
    return request({
        url: `${prefix}/` + itemId,
        method: 'Get',
    })
}

// 通过预算id删除预算详情
export function DelBudget(itemId) {
    return request({
        url: `${prefix}/` + itemId,
        method: 'Delete',
    })
}

// 通过科目id删除科目详情
export function DelBudgetItem(itemId) {
    return request({
        url: `${prefix}/item/` + itemId,
        method: 'Delete',
    })
}


// 获得科目列表
export function GetBudgetProject() {
    return request({
        url: `${prefix}/item`,
        method: 'Get',
    })
}