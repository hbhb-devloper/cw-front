import request from '@/utils/request1'
import { prefix } from '../invoice'

//获取列表
export function getList(params) {
  return request({
    url:`${prefix}/remuneration/list`,
    method:'get',
    params
  })
}
//删除
export function DeleteSerialNumber(data) {
  return request({
    url:`${prefix}/remuneration`,
    method:'delete',
    data
  })
}


