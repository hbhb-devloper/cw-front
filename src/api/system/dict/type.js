import request from '@/utils/request1'
import {prefix} from '../system'

// 查询字典类型列表（不分页）
export function listType(query) {
  return request({
    url: `${prefix}/dict/type/list`,
    method: 'get',
    params: query
  })
}

// 查询字典类型列表（分页）
export function pageType(query) {
  return request({
    url: `${prefix}/dict/type/page`,
    method: 'get',
    params: query
  })
}

// 查询字典类型详细
export function getType(dictId) {
  return request({
    url: `${prefix}/dict/type/` + dictId,
    method: 'get'
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: `${prefix}/dict/type`,
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateType(data) {
  return request({
    url: `${prefix}/dict/type`,
    method: 'put',
    data: data
  })
}

// 删除字典类型
export function delType(dictId) {
  return request({
    url: `${prefix}/dict/type/` + dictId,
    method: 'delete'
  })
}

// 清理参数缓存
export function clearCache() {
  return request({
    url: `${prefix}/dict/type/clearCache`,
    method: 'delete'
  })
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: `${prefix}/dict/type/optionselect`,
    method: 'get'
  })
}