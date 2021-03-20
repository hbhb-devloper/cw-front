import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from '../fund'
//获取单位列表
export function getUnitList(params) {
  return request1({
    url:`${prefix}/unit/list`,
    method:'get',
    params
  })
}
//单位修改
export function UpdateFund(data) {
  return request1({
    url:`${prefix}/unit`,
    method:'put',
    data
  })
}
