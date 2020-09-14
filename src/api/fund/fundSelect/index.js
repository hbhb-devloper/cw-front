import request from '@/utils/request'

//获取单位列表
export function getUnitList(){
  return request({
    url:'/fund/history/unit/list',
    method:'get'
  })
}
//获取表格数据列表
export function getHistroyList(params) {
  return request({
    url:'/fund/history/list',
    method:'get',
    params
  })
}
