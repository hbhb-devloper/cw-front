import request from '@/utils/request1'
import {prefix} from './propaganda'

// 查询宣传画面管理列表
export function listMaterials(query) {
    return request({
        url: `${prefix}/materials/list`,
        method: 'get',
        params: query
    })
}

// 删除宣传画面
export function deleteMaterials(id) {
    return request({
        url: `${prefix}/materials/${id}`,
        method: 'delete',
    })
}
// 添加宣传画面发起审批
export function materialsToApprove(data) {
    return request({
        url: `${prefix}/materials/to-approve`,
        method: 'post',
        data: data
    })
}


// 添加印刷品
export function materialsAdd(data) {
    return request({
        url: `${prefix}/materials`,
        method: 'post',
        data: data
    })
}

// 修改印刷品
export function materialsUpdate(data) {
    return request({
        url: `${prefix}/materials`,
        method: 'put',
        data: data
    })
}

// 跟据id查询详情
export function materialsDetail(id) {
    return request({
        url: `${prefix}/materials/${id}`,
        method: 'get',
    })
}

// 删除附件
export function materialsFileDelete(id) {
    return request({
        url: `${prefix}/materials/file/${id}`,
        method: 'delete',
    })
}


// 获取excel导入数据
export function materialsMaterials(id) {
    return request({
        url: `${prefix}/materials/materials?uuid=${id}`,
        method: 'get',
    })
}

// 获取宣传印刷用品流程详情
export function materialsFlowList(printId) {
    return request({
        url: `${prefix}/materials/flow/list/${printId}`,
        method: 'get',
    })
}


// 审批流程
export function materialsFlowApprove(data) {
    return request({
        url: `${prefix}/materials/flow/approve`,
        method: 'post',
        data:data
    })
}

//  删除导入数据
export function materialsDeleteMaterials(printId) {
    return request({
        url: `${prefix}/materials/materials/${printId}`,
        method: 'delete',
    })
}


// 物料制作预算控制列表
export function materialsStatistics(unitId) {
    return request({
        url:`${prefix}/materials/statistics?unitId=${unitId}`,
        method: 'get',
    })
}


