import request from '@/utils/request1'
import {prefix} from '../budget'


//查询table列表
export function getList(data){

  return request({
    url:`${prefix}/project/list`,
    method:'get',
    params:data
  })
}
//查询项目类型
export function getProejctType(){
  return request({
    url:`${prefix}/project-type/list`,
    method:'get'
  })
}

//删除记录
export function deleteData(id){
  return request({
    url:`${prefix}/project/delete/${id}`,
    method:'delete'
  })
}


//查询增值税率
export function getRate(){
  return request({
    url:`${prefix}/project/rate`,
    method:'get'
  })
}

//新增记录
export function addData(data) {
  return request({
    url:`${prefix}/project`,
    method:'post',
    data:data
  })
}

//查询详情
export function GetInfo(id){
  return request({
    url:`${prefix}/project/info/${id}`,
    method:'get'
  })
}

//查询详情
export function GetProjectInfo(id){
  return request({
    url:`${prefix}/progress/project/${id}`,
    method:'get'
  })
}

//修改提交
export function upData(data) {
  return request({
    url:`${prefix}/project/update`,
    method:'put',
    data:data
  })
}




//通过预算id获取金额阀值
export function getQuota(id) {
  return request({
    url:`${prefix}/threshold/${id}`,
    method:'get'
  })
}


export function getSubject(data){
  return request({
    url:`${prefix}/progress/project/statistics`,
    method:'get',
    params:data
  })
}

//删除文件
export function DeleteFile(id){
  return request({
    url:`${prefix}/project/file/delete/${id}`,
    method:'delete'
  })
}


//发起审批
export function LaunchApprove(data) {
  return request({
    url:`${prefix}/project/to-approve`,
    method:'post',
    data
  })
}


//版本回退
export function RevokeRevert(data) {
  return request({
    url:`${prefix}/project/revert`,
    method:'post',
    data
  })
}
