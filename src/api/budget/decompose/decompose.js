/*
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-07-07 17:50:31
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-27 23:50:14
 */
import request from '@/utils/request1'
import {prefix} from '../budget'
// 查询流程类型列表
export function listBudget(query) {
    return request({
        url: `${prefix}/list`,
        method: 'get',
        params: query
    })
}

// 修改岗位
export function updateBudget(data) {
    return request({
        url: `${prefix}/adjust`,
        method: 'put',
        data: data
    })
}

// 新增流程类型
export function BudgetExport(data) {
    return request({
        url: `${prefix}/export`,
        method: 'post',
        data: data
    })
}
