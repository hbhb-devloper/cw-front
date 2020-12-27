import request from '@/utils/request1'
import { prefix } from '../invoice'

export function GetList(params){
  return request({
    url:`${prefix}/taxpayer/list`,
    method:'get',
    params
  })
}

