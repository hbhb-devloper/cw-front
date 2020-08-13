import request from '@/utils/request'
import axios from 'axios'

// 查询记录列表
export function getList(query) {
  return request({
    url: '/invoice/invoice_1vat/list',
    method: 'get',
    params: query
  })
}

// 新增记录
export function adddata(data) {
  return request({
    url: '/invoice/invoice_1vat',
    method: 'post',
    data: data
  })
}

// 修改记录
export function update(data) {
  return request({
    url: '/invoice/invoice_1vat',
    method: 'put',
    data: data
  })
}

// 删除记录
export function delData(userId) {
  return request({
    url: `/invoice/invoice_1vat/${userId}`,
    method: 'delete'
  })
}

// 批量删除
export function delarr(userId) {
  return request({
    url: '/invoice/invoice_1vat/batch',
    method: 'delete',
    data: userId
  })
}
// 查询详情
export function getInfo(id){
 return request({
    url:`/invoice/invoice_1vat/info/${id}`,
    method:'get'
  })
}
