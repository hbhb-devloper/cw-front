import request from '@/utils/request1'
import {prefix} from '../budget'


//获取tabel列表
export function approvedList(id) {
  return request({
    url:`${prefix}/approved/list/${id}`,
    method:'get'
  })
}
//查询详情
export function approvedInfo(id){
  return request({
    url:`${prefix}/approved/info/${id}`,
    method:'get'
  })
}
//审批流程列表
export function approvedFlow(id) {
  return request({
    url:`${prefix}/approved/${id}`,
    method:'get'
  })
}
