import request from '@/utils/request1'
import { prefix } from '../invoice'


export function getLists(params) {
  return request({
    url:`${prefix}/detailed/list`,
    method:'get',
    params
  })

}

