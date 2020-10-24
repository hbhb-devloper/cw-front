import request from '@/utils/request'
//查询单位
export function getCompany(){
  return request({
    url:'/unit/tree-select',
    method:'get',
  })
}

export function getLists(params) {
  return request({
    url:'/invoice/incentive/list',
    method:'get',
    params
  })
}
