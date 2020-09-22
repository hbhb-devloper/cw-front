import request from '@/utils/request'

export function getImportTime() {
  return request({
    url:'/invoice/library/time',
    method:'get'
  })
}
