/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-10-13 14:47:11
 */

import request from '@/utils/request'



// 查询迁改基础信息列表
export function listStatement(query) {
    return request({
        url: '/relocation/statement/list',
        method: 'get',
        params: query
    })
}
