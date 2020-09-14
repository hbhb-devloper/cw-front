import request from '@/utils/request'

 export function getInfo(id) {
  return request({
    url:`/fund/history/detail/${id}`,
    method:'get'
  })
 }




