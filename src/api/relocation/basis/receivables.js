/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-09-23 14:58:58
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
