import request from '@/utils/request'

export function GetList(params){
  return request({
    url:'/invoice/account/run/list',
    method:'get',
    params
  })
}
export function getUpdateTime(params){
  return request({
    url:'/invoice/account/run/time',
    method:'get',
    params
  })
}


