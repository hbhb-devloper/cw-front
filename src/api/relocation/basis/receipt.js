/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-10-10 09:47:55
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