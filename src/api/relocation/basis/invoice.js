/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-09-23 14:50:40
 */

import request from '@/utils/request'



// 查询迁改基础信息列表
export function listInvoice(query) {
    return request({
        url: '/invoice/list',
        method: 'get',
        params: query
    })
}


// 新增迁改基础信息
export function addInvoice(data) {
    return request({
        url: '/invoice',
        method: 'post',
        data: data
    })
}

// 修改迁改基础信息
export function updateInvoice(data) {
    return request({
        url: '/invoice',
        method: 'put',
        data: data
    })
}

// 删除迁改基础信息
export function delarr(InvoiceId) {
    return request({
        url: '/invoice/' + InvoiceId,
        method: 'delete',
    })
}