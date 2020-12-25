import request from '@/utils/request'

export function getLists(params) {
  return request({
    url:'/invoice/incentive/list',
    method:'get',
    params
  })
}
