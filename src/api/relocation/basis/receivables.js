/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-09-30 10:13:38
 */

import request from '@/utils/request'



// 查询迁改基础信息列表
export function listIncome(query) {
    return request({
        url: '/income/list',
        method: 'get',
        params: query
    })
}
// 迁改收款详情查询
export function listIncomeDetail(id,isNeed) {
    return request({
        url: `/income/detail?id=${id}&isNeed=${isNeed}`,
        method: 'get',
    })
}

// 添加迁改收款详情
export function addIncome(data) {
    return request({
        url: '/income/addDetail',
        method: 'post',
        data:data
    })
}
