import request from '@/utils/request'

export function GetList(params){
  return request({
    url:'/invoice/taxpayer/list',
    method:'get',
    params
  })
}
export function GetTaxpayerDict(){
  return request({
    url:'/dict/invoice/invoice-taxpayer',
    method:'get',
  })
}
