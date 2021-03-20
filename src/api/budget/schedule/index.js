/*
 * @Author: cyz
 * @Date: 2020-07-10 17:50:34
 * @LastEditTime: 2020-12-27 23:53:15
 * @LastEditors: CYZ
 * @Description: In User Settings Edit
 * @FilePath: \cw-front\src\api\budget\schedule\index.js
 */
import request from '@/utils/request1'
import {prefix} from '../budget'


//查询列表
export function getProgressList(query) {
    return request({
        url: `${prefix}/progress/list`,
        method: 'get',
        params: query
    })
}
//查询列表
export function getProjectList(query) {
    return request({
        url: `${prefix}/progress/project/list`,
        method: 'get',
        params: query
    })
}