import request from '@/utils/request1'
import {prefix} from '../budget'


//查询表格
export function getTable(){
  return request({
    url:`${prefix}/map/list`,
    method:'get'
  })
}
// 导入表
export function uploadEmployee(params) {
  return request({
    url: `${prefix}/map/import`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    processData: false,
    data:params
  })
}
