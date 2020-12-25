import request from '@/utils/request'

export function getList(params) {
  return request({
    url:'/invoice/inspection/list',
    method:'get',
    params
  })
}
