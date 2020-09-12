import request from '@/utils/request'

//获取列表
export function getList(params) {
  return request({
    url:'/invoice/remuneration/list',
    method:'get',
    params
  })
}
export function DeleteDate(id){
  return request({
    url:'/invoice/remuneration'
  })
}
