import request from '@/utils/request1'
import {prefix} from '../budget'

export function getTypeInfo(id) {
  return request({
    url:`${prefix}/project/class/list/${id}`,
    method:'get'
  })
}
//新增
export function addClass(data) {
  return request({
    url:`${prefix}/project/split`,
    method:'post',
    data:data
  })
}
//获取tabel列表
export function getTable(id) {
  return request({
    url:`${prefix}/project/split/list/${id}`,
    method:'get'
  })
}
//获取详情
export function getClassInfo(id){
  return request({
    url:`${prefix}/project/split/info/${id}`,
    method:'get'
  })
}

//修改
export function UpdateClass(data){
  return request({
    url:`${prefix}/project/split/update`,
    method:'put',
    data
  })
}

//删除
export function ClassDelete(id) {
  return request({
    url:`${prefix}/project/split/delete/${id}`,
    method:'delete'
  })
}

//获取科目名称
export function getBudgetName(id) {
  return request({
    url:`${prefix}/${id}`,
    method:'get'
  })
}

//查询已申报未审批
export function getProject(data) {
  return request({
    url:`${prefix}/progress/project/list`,
    method:'get',
    params:data
  })
}

//审批流程列表
export function getFlow(id) {
  return request({
    url:`${prefix}/project/flow/${id}`,
    method:'get'
  })
}

//提交审批意见
export function SubmitApprove(data){
  return request({
    url:`${prefix}/project/approve`,
    method:'post',
    data
  })
}

//删除流程节点
export function deleteApprove(id) {
  return request({
    url:`${prefix}/project/flow/${id}`,
    method:'put'
  })
}

//获取流程历史
export function getHistory(id) {
  return request({
    url:`${prefix}/project/flow/history/${id}`,
    method:'get'
  })

}

//获取可删除的节点id
export function getDeleteApprove(id) {
  return request({
    url:`${prefix}/project/flow/isJoin/${id}`,
    method:'get'
  })
}
//获取可删除的节点id
export function getApproveState(id) {
  return request({
    url:`${prefix}/approved/state/${id}`,
    method:'get'
  })
}
