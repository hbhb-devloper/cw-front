import request from '@/utils/request1'
import {prefix} from '../invoice'
export function getList(params) {
  return request({
    url:`${prefix}/inspection/list`,
    method:'get',
    params
  })
}
