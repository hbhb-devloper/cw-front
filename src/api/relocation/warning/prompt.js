/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-10-19 14:49:06
 */

import request from '@/utils/request'



// 查询迁改基础信息列表
export function listWarn(query) {
    return request({
        url: '/relocation/warn/list',
        method: 'get',
        params: query
    })
}
