/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-31 14:35:54
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-17 17:18:31
 */
import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from './flow'


// 查询流程类型列表
export function listNode(query) {
    return request1({
        url: `${prefix}/node/list`,
        method: 'get',
        params: query
    })
}

export function listflow() {
    return request1({
        url: `${prefix}/select`,
        method: 'get',
    })
}