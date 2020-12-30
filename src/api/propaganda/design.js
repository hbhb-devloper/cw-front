import request from '@/utils/request1'
import {prefix} from './propaganda'

// 查询宣传画面管理列表
export function listPicture(query) {
    return request({
        url: `${prefix}/picture/list`,
        method: 'get',
        params: query
    })
}

// 删除宣传画面
export function deletePicture(id) {
    return request({
        url: `${prefix}/picture/${id}`,
        method: 'delete',
    })
}
// 添加宣传画面发起审批
export function PictureToApprove(data) {
    return request({
        url: `${prefix}/picture/to-approve`,
        method: 'post',
        data: data
    })
}


// 添加印刷品
export function pictureAdd(data) {
    return request({
        url: `${prefix}/picture`,
        method: 'post',
        data: data
    })
}

// 修改印刷品
export function pictureUpdate(data) {
    return request({
        url: `${prefix}/picture`,
        method: 'put',
        data: data
    })
}

// 跟据id查询详情
export function pictureDetail(id) {
    return request({
        url: `${prefix}/picture/${id}`,
        method: 'get',
    })
}

// 删除附件
export function pictureFileDelete(id) {
    return request({
        url: `${prefix}/picture/file/${id}`,
        method: 'delete',
    })
}


// // 获取excel导入数据
// export function printMaterials(id) {
//     return request({
//         url: `${prefix}/picture/materials?uuid=${id}`,
//         method: 'get',
//     })
// }

// 获取宣传印刷用品流程详情
export function pictureFlowList(printId) {
    return request({
        url: `${prefix}/picture/flow/list/${printId}`,
        method: 'get',
    })
}


// 审批流程
export function pictureFlowApprove(data) {
    return request({
        url: `${prefix}/picture/flow/approve`,
        method: 'post',
        data:data
    })
}
