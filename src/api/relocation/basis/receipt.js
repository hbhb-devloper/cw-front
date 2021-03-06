/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-03 13:45:52
 */

import request from '@/utils/request1'
import {prefix} from '../relocation'



// 查询迁改基础信息列表
export function listReceipt(query) {
    return request({
        url: `${prefix}/receipt/list`,
        method: 'get',
        params: query
    })
}
// 删除迁改基础信息
export function delarr(ReceiptId) {
    return request({
        url: `${prefix}/receipt/${ReceiptId}` ,
        method: 'delete',
    })
}

// 新增迁改基础信息
export function addReceipt(data) {
    return request({
        url: `${prefix}/receipt`,
        method: 'post',
        data: data
    })
}

// 修改迁改基础信息
export function updateReceipt(data) {
    return request({
        url: `${prefix}/receipt`,
        method: 'put',
        data: data
    })
}



// 跟据收据编号查看收据详情
export function receiptByreceiptNum(receiptNum) {
    return request({
        url: `${prefix}/receipt/info?receiptNum=${receiptNum}`,
        method: 'get',
    })
}
