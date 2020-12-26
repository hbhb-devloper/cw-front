import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from '../fund'

//获取表格数据列表
export function getHistroyList(params) {
  return request1({
    url:`${prefix}/customer/list`,
    method:'get',
    params
  })
}



