import request from '@/utils/request1'
import {prefix} from '../budget'


export function getDataList(params) {
  return request({
    url:`${prefix}/agile/list`,
    method:'get',
    params
  })
}

export function addDate(data) {
  return request({
    url:`${prefix}/agile`,
    method:'post',
    data
  })
}
export function getInfoDate(id) {
  return request({
    url:`${prefix}/agile/info/${id}`,
    method:'get'
  })
}
export function deleteDate(id) {
  return request({
    url:`${prefix}/agile/delete/${id}`,
    method:'delete'
  })
}
export function DeleteFile(id) {
  return request({
    url:`${prefix}/agile/delete/file/${id}`,
    method:'delete'
  })
}
