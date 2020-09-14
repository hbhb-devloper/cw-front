import request from '@/utils/request'

export function getListData(params) {
  return request({
    url:'/fund/stat/list',
    method:'get',
    params
  })
}
