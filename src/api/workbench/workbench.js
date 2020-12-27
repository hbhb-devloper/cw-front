/*
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-08-01 18:28:36
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-28 01:29:50
 */
import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from '../system/system'
// 查询提醒列表
export function getNoticeList(query) {
    return request({
        url: '/notice/list',
        method: 'get',
        params: query
    })
}
// 查询客户资金列表
export function getFundList(query) {
    return request({
        url: '/relocation/notice/list',
        method: 'get',
        params: query
    })
}
// 更新预算执行状态
export function updateNotice(id) {
    return request({
        url: '/notice/update/' + id,
        method: 'PUT'
    })
}
// 更新客户资金状态
export function updateFund(id) {
    return request({
        url: '/relocation/notice/update/' + id,
        method: 'PUT'
    })
}


// 查询文件列表
export function getWorkList() {
    return request1({
        url: `${prefix}/home/module`,
        method: 'get',
    })
}

export function getWorkDetailList(module) {
    return request({
        url: '/work/list/'+module,
        method: 'get',
    })
}