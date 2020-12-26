import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from '../fund'


 export function getInfo(id) {
  return request1({
    url:`${prefix}/customer/${id}`,
    method:'get'
  })
 }
 // todo
export function getStateDetail(id){
  return request({
    url:`/fund/stat/statDetail/${id}`,
    method:'get'
  })
}

export function getFlowList(id){
  return request1({
    url:`${prefix}/customer/${id}/flow`,
    method:'get'
  })
}




