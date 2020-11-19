/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-11-18 18:12:04
 */

import request from '@/utils/request1'
import { prefix } from '../relocation'



// 查询迁改基础信息列表
export function listWarn (query) {
  return request({
    url: `${prefix}/warn/list`,
    method: 'get',
    params: query
  })
}
// 查询迁改基础信息列表
export function WarnAdd (data) {
  return request({
    url: `${prefix}/warn/save`,
    method: 'post',
    data: data
  })
}
// 附件列表
export function warnfile (data) {
  return request({
    url: `${prefix}/warn/file`,
    method: 'get',
    params: data
  })
}
