import { prefix } from '../invoice'
import request from '@/utils/request1'



// 查询记录列表
export function getList(query) {
  return request({
    url: `${prefix}/invoice_3vat/list`,
    method: 'get',
    params: query
  })
}

// 新增记录
export function adddata(data) {
  return request({
    url: `${prefix}/invoice_3vat`,
    method: 'post',
    data: data
  })
}

// 修改记录
export function update(data) {
  return request({
    url: `${prefix}/invoice_3vat`,
    method: 'put',
    data: data
  })
}

// 删除记录
export function delData(userId) {
  return request({
    url: `${prefix}/invoice_3vat/${userId}`,
    method: 'delete'
  })
}
// 批量删除
export function delarr(userId) {
  return request({
    url: `${prefix}/invoice_3vat/batch`,
    method: 'delete',
    data: userId
  })
}
// 查询详情
export function getInfo(id) {
  return request({
    url: `${prefix}/invoice_3vat/info/${id}`,
    method: 'get'
  })
}
