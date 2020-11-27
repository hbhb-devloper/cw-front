import request from '@/utils/request'


export function getLists(params) {
  return request({
    url:'/invoice/detailed/list',
    method:'get',
    params
  })

}

