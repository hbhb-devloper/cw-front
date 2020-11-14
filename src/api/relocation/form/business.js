/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-11-12 09:32:44
 */

import request from '@/utils/request1'
import {prefix} from '../relocation'



// 查询迁改基础信息列表
export function listStatement(query) {
    return request({
        url: `${prefix}/statement/list`,
        method: 'get',
        params: query
    })
}
