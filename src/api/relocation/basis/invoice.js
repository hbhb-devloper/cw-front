/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-10-13 11:15:05
 */

import request from '@/utils/request'


// 查询迁改发票列表
export function listInvoice(query) {
    return request({
        url: '/reinvoice/list',
        method: 'get',
        params: query
    })
}
// 查询迁改发票详情
export function getInvoice(id) {
    return request({
        url: '/reinvoice/'+id,
        method: 'get',
    })
}

// 迁改管理发票模板导出
export function exportTemplate() {
    return request({
        url: '/reinvoice/exportTemplate',
        method: 'post',
    })
}

// 新增迁改发票
export function addInvoice(data) {
    return request({
        url: '/reinvoice/add',
        method: 'post',
        data: data
    })
}

// 修改迁改发票
export function updateInvoice(data) {
    return request({
        url: '/reinvoice',
        method: 'put',
        data: data
    })
}

// 删除迁改发票
export function delarr(InvoiceId) {
    return request({
        url: '/reinvoice/' + InvoiceId,
        method: 'delete',
    })
}