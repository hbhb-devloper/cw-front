import request from '@/utils/request'
import request1 from '@/utils/request1'
import { prefix } from '../fund'
//获取表格数据 
export function getListTable(params) {
  return request1({
    url: `${prefix}/invoice/list`,
    method: 'get',
    params
  })
}

//新增记录
export function addDate(data) {
  return request1({
    url: `${prefix}/invoice`,
    method: 'post',
    data
  })
}

//新增单位下拉 
export function fundSelect(unitName) {
  return request1({
    url: `${prefix}/unit/select?unitName=${unitName}`,
    method: 'get'
  })
}

export function fundSelect1(unitCode) {
  return request1({
    url: `${prefix}/unit/select?unitCode=${unitCode}`,
    method: 'get'
  })
}
//获取记录详情
export function getInfo(id) {
  return request1({
    url: `${prefix}/invoice/${id}`,
    method: 'get'
  })
}
//记录修改
export function upaDate(data) {
  return request1({
    url: `${prefix}/invoice`,
    method: 'put',
    data
  })
}
//文件删除
export function fileDelete(id) {
  return request1({
    url: `${prefix}/invoice/file/${fileId}`,
    method: 'delete'
  })
}
//记录删除
export function DeleteDate(id) {
  return request1({
    url: `${prefix}/invoice/${id}`,
    method: 'delete'
  })
}
//发起审批
export function approveFlow(data) {
  return request1({
    url: `${prefix}/invoice/to-approve`,
    method: 'post',
    data
  })
}

export function cancellation(id, state) {
  return request1({
    url: `${prefix}/invoice/discard/${id}?cancellation=${state}`,
    method: 'put'
  })
}

export function updateInfo(data) {
  return request1({
    url: `${prefix}/invoice/additional`,
    method: 'put',
    data
  })
}

