/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-31 14:35:54
 * @LastEditors: CYZ
 * @LastEditTime: 2020-07-31 14:42:31
 */
import request from '@/utils/request'



// 查询流程类型列表
export function listNode(query) {
    return request({
        url: '/flow/info/list',
        method: 'get',
        params: query
    })
}

export function listflow() {
    return request({
        url: '/flow/name',
        method: 'get',
    })
}