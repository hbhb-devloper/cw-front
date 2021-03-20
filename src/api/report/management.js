import request from '@/utils/request1'
import {prefix} from './report'

// 报表管理内容分页列表
export function manageList() {
  return request({
    url:`${prefix}/manage/list`,
    method:'get',
  })
}
// 新增表管理内容
export function manageAdd(data) {
  return request({
    url:`${prefix}/manage`,
    method:'post',
    data:data
  })
}
// 修改表管理内容
export function manageEdit(data) {
  return request({
    url:`${prefix}/manage`,
    method:'put',
    data:data
  })
}

// 获取管理内容下拉框
export function manageSelect() {
  return request({
    url:`${prefix}/manage/name`,
    method:'get',
  })
}
