/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-20 16:36:11
 * @LastEditors: CYZ
 * @LastEditTime: 2020-07-20 16:37:13
 */
import request from '@/utils/request1'
import {prefix} from '../budget'


//查询表格
export function getBudget(query) {
    return request({
        url: `${prefix}/history/list`,
        method: 'get',
        params: query
    })
}