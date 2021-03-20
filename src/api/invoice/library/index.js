import request from '@/utils/request1'
import { prefix } from '../invoice'

export function getImportTime() {
  return request({
    url:`${prefix}/library/time`,
    method:'get'
  })
}
