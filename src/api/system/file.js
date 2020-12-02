import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from './system'

// 查询字典数据列表
export function fileInfo(fileId) {
  return request1({
    url: `${prefix}/file/info?fileId=${fileId}`,
    method: 'get',
  })
}

// 查询文件列表
export function getFileList(bizType) {
  return request1({
      url: `${prefix}/file/list?bizType=${bizType}`,
      method: 'get',
  })
}

// 查询文件列表
export function delFileList(id) {
  return request1({
      url: `${prefix}/file/delete/`+id,
      method: 'DELETE',
  })
}
