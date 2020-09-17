import request from '@/utils/request'

export function getInfo(id) {
  return request({
    url:`/fund/advance/info/${id}`,
    method:'get'
  })
}
export function getFlowList(id) {
  return request({
    url:`/fund/invoice/flow/list/${id}`,
    method:'get'
  })
}
export function advanceApprove(data) {
  return request({
    url:'/fund/advance/approve',
    method:'post',
    data
  })
}
export function getOpinionList() {
  return request({
    url:'/flow/suggestion/list',
    method:'get'
  })
}
export function upDateInvoice(data) {
  return request({
    url:'/fund/advance/update-info',
    method:'put',
    data
  })
}
