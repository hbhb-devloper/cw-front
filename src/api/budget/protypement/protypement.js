import request from '@/utils/request'


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
export function SubmitData(data) {
    return request({
        url: '/budget/data',
        method: 'put',
        data: data
    })
}
