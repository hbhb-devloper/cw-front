import request from '@/utils/request1'
import {prefix} from './system'

// 查询字典数据列表
export function fileInfo(fileId) {
  return request({
    url: `${prefix}/file/info?fileId=${fileId}`,
    method: 'get',
  })
}