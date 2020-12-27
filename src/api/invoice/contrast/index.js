import request from '@/utils/request1'
import { prefix } from '../invoice'

//获取对比表
export function getContrastList(params) {
  return request({
    url:`${prefix}/contrast/list`,
    method:'get',
    params
  })
}
