import request from '@/utils/request'

//获取表格数据
export function getListTable(params) {
  return request({
    url:'/fund/advance/list',
    method:'get',
    params
  })
}
//获取状态列表
export function getStateList() {
  return request({
    url:'/dict/budget/project-status',
    method:'get'
  })
}
//新增记录
export function addDate(data){
  return request({
    url:'/fund/advance/add',
    method:'post',
    data
  })
}
//办理业务下拉
export function getBusiness(){
  return request({
    url:'/dict/fund/invoice-business',
    method:'get'
  })
}
//开票 内容下拉
export function getContentList() {
  return request({
    url:'/dict/fund/invoice-content',
    method:'get'
  })
}
//新增单位下拉
export function getUnitList() {
  return request({
    url:'/fund/cond-list',
    method:'get'
  })
}
//状态
export function getStatusList() {
  return request({
    url:'/dict/fund/invoice-status',
    method:'get',
  })
}

//记录修改
export function upaDate(data) {
  return request({
    url:'/fund/advance/update',
    method:'put',
    data
  })
}



