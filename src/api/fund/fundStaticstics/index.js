import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from '../fund'

export function getListData(params) {
  return request1({
    url:`${prefix}/stat/list`,
    method:'get',
    params
  })
}
