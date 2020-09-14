/*
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-07-07 17:50:31
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-07-13 16:20:41
 */
import request from '@/utils/request'
// 查询流程类型列表
export function listBudget(query) {
    return request({
        url: '/budget/list',
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
