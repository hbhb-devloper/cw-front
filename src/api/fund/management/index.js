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
//获取记录详情
export function getInfo(id) {
  return request({
    url:`/fund/advance/info/${id}`,
    method:'get'
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
//文件删除
export function fileDelete(id) {
  return request({
    url:`/fund/advance/delete/file/${id}`,
    method:'delete'
  })
}
//记录删除
export function DeleteDate(id) {
  return request({
    url:`/fund/advance/delete/${id}`,
    method:'delete'
  })
}
//发起审批
export function approveFlow(data) {
  return request({
    url:'/fund/advance/to-approve',
    method:'post',
    data
  })
}

export function cancellation(id,state){
  return request({
    url:`/fund/advance/cancellation/${id}?cancellation=${state}`,
    method:'put'
  })
}

export function updateInfo(data) {
  return request({
    url:'/fund/advance/update-info',
    method:'put',
    data
  })
}

