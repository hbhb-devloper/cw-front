import request from '@/utils/request1'
import {prefix} from './propaganda'

// 查询印刷用品管理列表
export function listPrint(query) {
    return request({
        url: `${prefix}/print/list`,
        method: 'get',
        params: query
    })
}

// 删除印刷品
export function deletePrint(id) {
    return request({
        url: `${prefix}/print/${id}`,
        method: 'delete',
    })
}
// 添加印刷品发起审批
export function printToApprove(data) {
    return request({
        url: `${prefix}/print/to-approve`,
        method: 'post',
        data: data
    })
}

// 添加印刷品
export function printAdd(data) {
    return request({
        url: `${prefix}/print`,
        method: 'post',
        data: data
    })
}

// 修改印刷品
export function printUpdate(data) {
    return request({
        url: `${prefix}/print`,
        method: 'put',
        data: data
    })
}

// 跟据id查询详情
export function printDetail(id) {
    return request({
        url: `${prefix}/print/${id}`,
        method: 'get',
    })
}

// 删除附件
export function printFileDelete(id) {
    return request({
        url: `${prefix}/print/file/${id}`,
        method: 'delete',
    })
}


// 获取excel导入数据
export function printMaterials(id) {
    return request({
        url: `${prefix}/print/materials?uuid=${id}`,
        method: 'get',
    })
}

// 获取宣传印刷用品流程详情
export function printFlowList(printId) {
    return request({
        url: `${prefix}/print/flow/list/${printId}`,
        method: 'get',
    })
}


// 审批流程
export function printFlowApprove(data) {
    return request({
        url: `${prefix}/print/flow/approve`,
        method: 'post',
        data:data
    })
}

//  获取市场部审核员下拉列表
export function printRoleUser() {
    return request({
        url: `${prefix}/print/role-user`,
        method: 'get',
    })
}


//  删除导入数据
export function printDeleteMaterials(printId) {
    return request({
        url: `${prefix}/print/materials/${printId}`,
        method: 'delete',
    })
}