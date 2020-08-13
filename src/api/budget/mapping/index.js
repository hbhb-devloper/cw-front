import request from '@/utils/request'
import axios from 'axios'


//查询表格
export function getTable(){
  return request({
    url:'/budget/map/list',
    method:'get'
  })
}
// 导入表
export function uploadEmployee(params) {
  return request({
    url: '/budget/map/import',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    processData: false,
    data:params
  })
}
