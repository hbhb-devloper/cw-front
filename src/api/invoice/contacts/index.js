import request from '@/utils/request1'
import { prefix } from '../invoice'

export function GetList(params){
  return request({
    url:`${prefix}/account/run/list`,
    method:'get',
    params
  })
}
export function getUpdateTime(params){
  return request({
    url:`${prefix}/account/run/time`,
    method:'get',
    params
  })
}


