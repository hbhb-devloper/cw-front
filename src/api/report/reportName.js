import request from '@/utils/request1'
import { prefix } from './report'

// 报表报表名称分页列表
export function categoryList(query) {
    return request({
        url: `${prefix}/category/list`,
        method: 'get',
        params:query
    })
}

// 新增表报表名称
export function categoryAdd(data) {
    return request({
        url: `${prefix}/category`,
        method: 'post',
        data: data
    })
}

// 修改表报表名称
export function categoryEdit(data) {
    return request({
        url: `${prefix}/category`,
        method: 'put',
        data: data
    })
}
