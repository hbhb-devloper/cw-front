import request from '@/utils/request1'
import {prefix} from './propaganda'

// 新增物料活动产品列表
export function addLibrary(data) {
    return request({
        url: `${prefix}/library/add`,
        method: 'post',
        data: data
    })
}

// 修改活动或产品
export function putLibrary(data) {
    return request({
        url: `${prefix}/library`,
        method: 'put',
        data: data
    })
}

// 通过id获取产品详情
export function getLibraryDetail(id) {
    return request({
        url: `${prefix}/library/${id}`,
        method: 'get',
    })
}

// 物料活动产品树
export function getLibraryTree(query) {
    return request({
        url: `${prefix}/library/tree`,
        method: 'get',
        params: query
    })
}


// 物料相关设定添加
export function addSetting(data) {
    return request({
        url: `${prefix}/goods/setting/add`,
        method: 'post',
        data:data
    })
}
// 物料相关设定列表
export function getSetting() {
    return request({
        url: `${prefix}/goods/setting`,
        method: 'get',
    })
}

// 修改活动或产品
export function putLibraryBatch(data) {
    return request({
        url: `${prefix}/library/batch`,
        method: 'put',
        data: data
    })
}



// 物料相关设定列表
export function getSettingMove(query) {
    return request({
        url: `${prefix}/goods/setting/move`,
        method: 'get',
        params:query
    })
}
