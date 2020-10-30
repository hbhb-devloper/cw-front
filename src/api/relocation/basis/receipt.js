/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-10-10 15:13:58
 */

import request from '@/utils/request'



// 查询迁改基础信息列表
export function listReceipt(query) {
    return request({
        url: '/relocation/receipt/list',
        method: 'get',
        params: query
    })
}
// 删除迁改基础信息
export function delarr(ReceiptId) {
    return request({
        url: '/relocation/receipt/delete/' + ReceiptId,
        method: 'delete',
    })
}

// 新增迁改基础信息
export function addReceipt(data) {
    return request({
        url: '/relocation/receipt/add',
        method: 'post',
        data: data
    })
}

// 修改迁改基础信息
export function updateReceipt(data) {
    return request({
        url: '/relocation/receipt/update',
        method: 'put',
        data: data
    })
}