import request from '@/utils/request'
import axios from 'axios'

// 查询记录列表
export function getList(query) {
  return request({
    url: '/invoice/invoice_machine/list',
    method: 'get',
    params: query
  })
}

// 新增记录
export function adddata(data) {
  return request({
    url: '/invoice/invoice_machine/add',
    method: 'post',
    data: data
  })
}

// 修改记录
export function update(data) {
  return request({
    url: '/invoice/invoice_machine/edit',
    method: 'put',
    data: data
  })
}

// 删除记录
export function delData(Id) {
  return request({
    url: `/invoice/invoice_machine/${Id}`,
    method: 'delete'
  })
}

// 批量删除
export function delarr(userId) {
  return request({
    url: '/invoice/invoice_machine/batch',
    method: 'delete',
    data:  userId
  })
}

// 查询详情
export function getInfo(id){
  return request({
    url:`/invoice/invoice_machine/info/${id}`,
    method:'get'
  })
}
