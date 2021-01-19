import request from '@/utils/request1'
import {prefix} from './system'


// 分页获取营业厅列表
export function listHall(query) {
  return request({
    url: `${prefix}/hall/list`,
    method: 'get',
    params: query
  })
}

// 获取营业厅列表
export function getHallSelect(unitId) {
  return request({
    url: `${prefix}/hall/select?unitId=${unitId}`,
    method: 'get',
  })
}
// 获取营业厅列表
export function getHallSelectNew(query) {
  return request({
    url: `${prefix}/hall/select_new`,
    method: 'get',
    params:query
  })
}

// 绑定营业厅和单位
export function updataHallNew(data,userId) {
  return request({
    url: `${prefix}/hall/updateHallNew?userId=${userId}`,
    method: 'put',
    data: data
  })
}
// 添加营业厅
export function addHall(data) {
  return request({
    url: `${prefix}/hall`,
    method: 'post',
    data: data
  })
}

// 修改营业厅
export function updataHall(data) {
  return request({
    url: `${prefix}/hall`,
    method: 'put',
    data: data
  })
}

// 获取所有的分公司列表
export function getUnitSubList() {
  return request({
    url: `${prefix}/unit/sub/list`,
    method: 'get'
  })
}
