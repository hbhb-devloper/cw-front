/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-11-19 21:43:15
 */

import request from '@/utils/request1'
import { prefix } from '../relocation'



// 查询迁改基础信息列表
export function listWarn(query) {
  function deepClone(obj) {
    let result = typeof obj.splice === "function" ? [] : {};
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
          result[key] = deepClone(obj[key]); //如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
        } else {
          result[key] = obj[key]; //如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
        }

      }
      return result;
    }
    return obj;
  }
  let queryParams = deepClone(query)
  if (queryParams.contractNum) {
    queryParams.contractNum = encodeURI(
      queryParams.contractNum
    );
  }
  return request({
    url: `${prefix}/warn/list`,
    method: 'get',
    params: queryParams
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