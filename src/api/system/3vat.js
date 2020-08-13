import request from '@/utils/request'

// 查询3%增值税专票列表
export function vatlist(query) {
    return request({
        url: '/invoice/invoice_3vat/list',
        method: 'get',
        params: query
    })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
    return request({
        url: '/system/dept/list/exclude/' + deptId,
        method: 'get'
    })
}

// 查询部门详细
export function getDept(deptId) {
    return request({
        url: '/system/dept/' + deptId,
        method: 'get'
    })
}