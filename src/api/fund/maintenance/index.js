import request from '@/utils/request'

//获取单位列表
export function getUnitList(params) {
  return request({
    url:'/fund/list',
    method:'get',
    params
  })
}
//单位修改
export function UpdateFund(data) {
  return request({
    url:'/fund/update',
    method:'put',
    data
  })
}
