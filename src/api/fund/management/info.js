import request from '@/utils/request'
import request1 from '@/utils/request1'
import { prefix } from '../fund'
import { prefix1 } from '../../flow/flow'


export function advanceApprove(data) {
  return request1({
    url: `${prefix}/invoice/approve`,
    method: 'post',
    data
  })
}
export function getOpinionList() {
  return request1({
    url: `${prefix1}/suggestion/list`,
    method: 'get'
  })
}
export function getFlowList(id) {
  return request1({
    url: `${prefix}/invoice/${id}/flow`,
    method: 'get'
  })
}