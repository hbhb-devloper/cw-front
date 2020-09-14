import request from '@/utils/request'

//获取列表
export function getList(params) {
  return request({
    url:'/invoice/remuneration/list',
    method:'get',
    params
  })
}
//税率
export function getTaxtype() {
  return request({
    url:'/dict/budget/invoice-tax-type',
    method:'get',
  })
}
//删除
export function DeleteSerialNumber(data) {
  return request({
    url:`/invoice/remuneration`,
    method:'delete',
    data
  })
}


