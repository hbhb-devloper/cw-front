import request from '@/utils/request'

export function GetList(params){
  return request({
    url:'/invoice/taxpayer/list',
    method:'get',
    params
  })
}
