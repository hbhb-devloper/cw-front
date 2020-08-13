import request from '@/utils/request'

//查询单位
export function getCompany() {
    return request({
        url: '/unit/list',
        method: 'get',
    })
}
//查询树形结构
export function getTree(data) {
    return request({
        url: '/budget/tree',
        method: 'get',
        params: data
    })
}
//查询项目类别管理
export function getProejctType(data) {
    return request({
        url: `/budget/data/list`,
        method: 'get',
        params:data
    })
}

//查询复选框
export function getCheckBox() {
    return request({
        url: `/unit/short-name/list`,
        method: 'get'
    })
}

export function SubmitData(data) {
    return request({
        url: '/budget/data',
        method: 'put',
        data: data
    })
}
