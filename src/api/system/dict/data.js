import request from '@/utils/request1'
import {prefix} from '../system'

// 查询字典数据列表
export function listData(query) {
  return request({
    url: `${prefix}/dict/list`,
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: `${prefix}/dict/` + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(Type,Code) {
  return request({
    url: `${prefix}/dict?type=${Type}&code=${Code}`,
    method: 'get'
  })
}

// 新增字典数据
export function addData(data) {
  return request({
    url: `${prefix}/dict`,
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: `${prefix}/dict`,
    method: 'put',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode) {
  return request({
    url: `${prefix}/dict/` + dictCode,
    method: 'delete'
  })
}
