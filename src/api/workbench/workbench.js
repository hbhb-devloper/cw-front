/*
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-08-01 18:28:36
 * @LastEditors: CYZ
 * @LastEditTime: 2020-08-08 14:52:55
 */
import request from '@/utils/request'
// 查询提醒列表
export function getNoticeList(query) {
    return request({
        url: '/notice/list',
        method: 'get',
        params: query
    })
}
// 查询提醒列表
export function updateNotice(id) {
    return request({
        url: '/notice/update/' + id,
        method: 'PUT'
    })
}
// 查询文件列表
export function getFileList(query) {
    return request({
        url: '/file/list',
        method: 'get',
        params: query
    })
}
// 查询文件列表
export function delFileList(id) {
    return request({
        url: '/file/delete/'+id,
        method: 'DELETE',
    })
}

