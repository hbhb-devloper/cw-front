/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-11-18 18:32:13
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-16 11:05:44
 */
import request from '@/utils/request'
import request1 from '@/utils/request1'
import { prefix } from './flow'
//查询提醒列表
export function getremindList() {
    return request1({
        url: `${prefix}/notice/list`,
        method: 'get'
    })
}
//新增提醒
export function addData(data) {
    return request1({
        url: `${prefix}/notice`,
        method: 'post',
        data
    })
}
//修改提醒
export function upData(data) {
    return request1({
        url: `${prefix}/notice/update`,
        method: 'put',
        data
    })
}
//删除记录
export function DeleteRecord(id) {
    return request1({
        url: `${prefix}/notice/delete/${id}`,
        method: 'delete'
    })
}
//记录详情
export function getInfo(id) {
    return request1({
        url: `${prefix}/notice/info/${id}`,
        method: 'get'
    })
}