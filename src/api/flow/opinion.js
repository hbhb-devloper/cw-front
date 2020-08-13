import request from '@/utils/request'

//查询提醒列表
export function  getList() {
  return request({
    url:'/flow/suggestion/list',
    method:'get'
  })
}
//新增提醒
export function addData(data) {
  return request({
    url:'/flow/suggestion',
    method:'post',
    data
  })
}
//修改提醒
export function upData(data) {
  return request({
    url:'/flow/suggestion/update',
    method:'put',
    data
  })
}
//删除记录
export function DeleteRecord(id) {
  return request({
    url:`/flow/suggestion/delete/${id}`,
    method:'delete'
  })
}
//记录详情
export function getInfo(id) {
  return request({
    url:`/flow/suggestion/info/${id}`,
    method:'get'
  })
}
