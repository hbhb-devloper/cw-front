import request from '@/utils/request'
import request1 from '@/utils/request1'
import {prefix} from './system'

// 旧·查询公告列表
// export function listNotice(query) {
//   return request({
//     url: '/broadcast/list',
//     method: 'get',
//     params: query
//   })
// }
// 新·查询公告列表
export function listNotice(query) {
  return request1({
    url: `${prefix}/broadcast/list`,
    method: 'get',
    params: query
  })
}

// 旧·查询公告详细
// export function getNotice() {
//   return request({
//     url: '/broadcast/publish',
//     method: 'get'
//   })
// }
// 新·查询公告详细
export function getNotice() {
  return request1({
    url: `${prefix}/broadcast/publish`,
    method: 'get'
  })
}

// 旧·新增公告
// export function addNotice(data) {
//   return request({
//     url: '/broadcast',
//     method: 'post',
//     data: data
//   })
// }
// 新·新增公告
export function addNotice(data) {
  return request1({
    url: `${prefix}/broadcast`,
    method: 'post',
    data: data
  })
}

// 旧·修改公告
// export function updateNotice(data) {
//   return request({
//     url: '/broadcast',
//     method: 'put',
//     data: data
//   })
// }
// 新·修改公告
export function updateNotice(data) {
  return request1({
    url: `${prefix}/broadcast`,
    method: 'put',
    data: data
  })
}

// 旧·删除公告
// export function delNotice(noticeId) {
//   return request({
//     url: '/broadcast/' + noticeId,
//     method: 'delete'
//   })
// }
// 新·删除公告
export function delNotice(noticeId) {
  return request1({
    url: `${prefix}/broadcast/` + noticeId,
    method: 'delete'
  })
}


