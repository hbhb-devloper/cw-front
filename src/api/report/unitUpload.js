import request from '@/utils/request1'
import { prefix } from './report'

// 报表管理内容分页列表
export function reportUnitList(query) {
    return request({
        url: `${prefix}/report/count/unit/list`,
        method: 'get',
        params: query
    })
}