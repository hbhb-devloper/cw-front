/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-25 13:58:28
 */

import request from '@/utils/request1'
import { prefix } from '../relocation'



// 开票未回款预警提示列表
export function listStratWarn(query) {
  return request({
    url: `${prefix}/warn/start-list`,
    method: 'get',
    params: query
  })
}

// 合同到期未回款预警列表
export function listFinalWarn(query) {
  return request({
    url: `${prefix}/warn/final-list`,
    method: 'get',
    params: query
  })
}

// 查询迁改基础信息列表
export function WarnAdd(data) {
  return request({
    url: `${prefix}/warn/save`,
    method: 'post',
    data: data
  })
}
// 附件列表
export function warnfile(data) {
  return request({
    url: `${prefix}/warn/file`,
    method: 'get',
    params: data
  })
}
// 查询迁改基础信息列表
export function treeListWarn(query) {
  return request({
    url: `${prefix}/warn/tree-list`,
    method: 'get',
    params: query
  })
}