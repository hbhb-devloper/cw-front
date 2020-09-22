import request from '@/utils/request'
//查询单位
export function getCompany(){
  return request({
    url:'/unit/tree-select',
    method:'get',
  })
}
export function getList(params) {
  return request({
    url:'/invoice/inspection/list',
    method:'get',
    params
  })
}
