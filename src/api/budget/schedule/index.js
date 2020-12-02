/*
 * @Author: cyz
 * @Date: 2020-07-10 17:50:34
 * @LastEditTime: 2020-07-14 17:39:26
 * @LastEditors: CYZ
 * @Description: In User Settings Edit
 * @FilePath: \cw-front\src\api\budget\schedule\index.js
 */
import request from '@/utils/request'


//查询列表
export function getProgressList(query) {
    return request({
        url: '/budget/progress/list',
        method: 'get',
        params: query
    })
}
//查询列表
export function getProjectList(query) {
    return request({
        url: '/budget/progress/project/list',
        method: 'get',
        params: query
    })
}