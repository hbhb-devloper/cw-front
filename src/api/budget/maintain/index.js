import request from '@/utils/request1'
import {prefix} from '../budget'
// 通过项目编号获得项目签报（分页）
export function maintainList(query) {
  return request({
    url:`${prefix}/maintain/list`,
    method:'get',
    params:query
  })
}
// 删除签报
export function maintainDelete(id) {
  return request({
    url:`${prefix}/maintain/delete/${id}`,
    method:'delete',
  })
}