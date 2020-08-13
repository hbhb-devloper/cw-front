/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-07 17:50:31
 * @LastEditors: CYZ
 * @LastEditTime: 2020-07-14 14:32:57
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

// 新增流程类型
export function BudgetExport(data) {
    return request({
        url: '/budget/export',
        method: 'post',
        data: data
    })
}