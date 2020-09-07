import request from '@/utils/request'

//获取单位列表
export function getUnitList() {
  return request({
    url:'/fund/list',
    method:'get'
  })
}
