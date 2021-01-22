import request from '@/utils/request1'
import { prefix } from './report'

// 报表报表名称分页列表
export function categoryList(query) {
    return request({
        url: `${prefix}/category/list`,
        method: 'get',
        params: query
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

// 跟据管理内容获取报表名称信息详情
export function categoryDetail(id) {
    return request({
        url: `${prefix}/category/${id}`,
        method: 'get',
    })
}
// 跟据管理内容获取报表名称信息
export function categoryName(query) {
    return request({
        url: `${prefix}/category/name`,
        method: 'get',
        params: query
    })
}

// 报表名称内容分页列表
export function propertyList(query) {
    return request({
        url: `${prefix}/property/list`,
        method: 'get',
        params: query
    })
}
// 报表名称内容分页列表
export function propertyEdit(data) {
    return request({
        url: `${prefix}/property`,
        method: 'put',
        data: data
    })
}


// 跟据报表名称id获取周期
export function propertyPeriod(query) {
    return request({
        url: `${prefix}/property/period`,
        method: 'get',
        params: query
    })
}
