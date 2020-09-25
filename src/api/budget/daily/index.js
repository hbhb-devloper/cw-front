import request from '@/utils/request'

//查询单位
export function getCompany(){
  return request({
    url:'/unit/tree-select',
    method:'get',
  })
}
export function getDataList(params) {
  return request({
    url:'/budget/agile/list',
    method:'get',
    params
  })
}
export function getTypeList() {
  return request({
    url:'/dict/fund/budget-type',
    method:'get'
  })
}
export function addDate(data) {
  return request({
    url:'/budget/agile',
    method:'post',
    data
  })
}
export function getInfoDate(id) {
  return request({
    url:`/budget/agile/info/${id}`,
    method:'get'
  })
}
export function deleteDate(id) {
  return request({
    url:`/budget/agile/delete/${id}`,
    method:'delete'
  })

}
