import request from '@/utils/request'


export function getLists(params) {
  return request({
    url:'/invoice/focus/list',
    method:'get',
    params
  })
}
