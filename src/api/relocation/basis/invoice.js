/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-12 10:51:44
 */

import request from '@/utils/request1'
import {prefix} from '../relocation'

// 查询迁改发票列表
export function listInvoice(query) {
    return request({
        url: `${prefix}/invoice/list`,
        method: 'get',
        params: query
    })
}
// 查询迁改发票详情
export function getInvoice(id) {
    return request({
        url: `${prefix}/invoice/${id}`,
        method: 'get',
    })
}

// 迁改管理发票模板导出
export function exportTemplate() {
    return request({
        url: `${prefix}/invoice/exportTemplate`,
        method: 'post',
    })
}

// 新增迁改发票
export function addInvoice(data) {
    return request({
        url: `${prefix}/invoice/add`,
        method: 'post',
        data: data
    })
}

// 修改迁改发票
export function updateInvoice(data) {
    return request({
        url: `${prefix}/invoice`,
        method: 'put',
        data: data
    })
}

// 删除迁改发票
export function delarr(InvoiceId) {
    return request({
        url: `${prefix}/invoice/${InvoiceId}` ,
        method: 'delete',
    })
}


// 跟据收据编号查看收据详情
export function invoiceByInvoiceNum(InvoiceNum) {
    return request({
        url: `${prefix}/invoice/info?invoiceNum=${InvoiceNum }`,
        method: 'get',
    })
}
