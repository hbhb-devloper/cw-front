/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-09-29 16:24:11
 */

import request from '@/utils/request'



// 查询迁改基础信息列表
export function listInvoice(query) {
    return request({
        url: '/reinvoice/list',
        method: 'get',
        params: query
    })
}

// 迁改管理发票模板导出
export function exportTemplate() {
    return request({
        url: '/reinvoice/exportTemplate',
        method: 'post',
    })
}

// 新增迁改基础信息
export function addInvoice(data) {
    return request({
        url: '/reinvoice',
        method: 'post',
        data: data
    })
}

// 修改迁改基础信息
export function updateInvoice(data) {
    return request({
        url: '/reinvoice',
        method: 'put',
        data: data
    })
}

// 删除迁改基础信息
export function delarr(InvoiceId) {
    return request({
        url: '/reinvoice/' + InvoiceId,
        method: 'delete',
    })
}