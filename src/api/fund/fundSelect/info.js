import request from '@/utils/request'

 export function getInfo(id) {
  return request({
    url:`/fund/history/detail/${id}`,
    method:'get'
  })
 }
export function getStateDetail(id){
  return request({
    url:`/fund/stat/statDetail/${id}`,
    method:'get'
  })
}
export function getBusiness() {
  return request({
    url:'/dict/fund/business-type',
    method:'get'
  })
}



