import request from '@/utils/request'

//获取对比表
export function getContrastList(params) {
  return request({
    url:'/invoice/contrast/list',
    method:'get',
    params
  })
}
