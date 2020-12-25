/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-10 18:24:18
 */

import request from '@/utils/request1'
import {prefix} from '../relocation'



// 查询迁改涉财统计列表
export function listRefinance(query) {
    return request({
        url: `${prefix}/refinance/list`,
        method: 'get',
        params: query
    })
}
