import request from '@/utils/request'
import request1 from '@/utils/request1'
import { prefix as fundPrefix } from '../fund'
import { prefix as flowPrefix } from '../../flow/flow'


export function advanceApprove(data) {
  return request1({
    url: `${fundPrefix}/invoice/approve`,
    method: 'post',
    data
  })
}
export function getOpinionList() {
  return request1({
    url: `${flowPrefix}/suggestion/list`,
    method: 'get'
  })
}
export function getFlowList(id) {
  return request1({
    url: `${fundPrefix}/invoice/${id}/flow`,
    method: 'get'
  })
}
