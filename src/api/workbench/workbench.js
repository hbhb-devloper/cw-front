/*
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-08-01 18:28:36
 * @LastEditors: CYZ
 * @LastEditTime: 2021-01-06 16:53:55
 */
import request from '@/utils/request'

import request1 from '@/utils/request1'
import { prefix as systemPrefix } from '../system/system'
import { prefix as budgetPrefix } from '../budget/budget'
import { prefix as fundPrefix } from '../fund/fund'
import { prefix as propagandaPrefix } from '../propaganda/propaganda'

// 工作台模块统计
export function getWorkList() {
  return request1({
    url: `${systemPrefix}/home/module`,
    method: 'get',
  })
}

// 预算提醒
export function getBudgetSummary() {
  return request1({
    url: `${budgetPrefix}/notice/summary`,
    method: 'get'
  })
}

// 更多-预算列表
export function getBudgetNotice(query) {
    return request1({
        url: `${budgetPrefix}/notice/list`,
        method: 'get',
        params: query
    })
}

// 更新预算提醒状态
export function updateBudgetNotice(id) {
  return request1({
    url: `${budgetPrefix}/notice/` + id,
    method: 'PUT'
  })
}

// 客户资金提醒
export function getFundSummary() {
  return request1({
    url: `${fundPrefix}/notice/summary`,
    method: 'get'
  })
}

// 更多-客户资金列表
export function getFundNotice(query) {
    return request1({
        url: `${fundPrefix}/notice/list`,
        method: 'get',
        params: query
    })
}

// 更新客户资金提醒状态
export function updateFundNotice(id) {
  return request1({
    url: `${fundPrefix}/notice/` + id,
    method: 'PUT'
  })
}

// 宣传品物料提醒
export function getMaterialsSummary() {
  return request1({
    url: `${propagandaPrefix}/materials/notice/summary`,
    method: 'get'
  })
}

// 宣传品画面制作提醒
export function getPictureSummary() {
  return request1({
    url: `${propagandaPrefix}/picture/notice/summary`,
    method: 'get'
  })
}

// 宣传品印刷品提醒
export function getPrintSummary() {
  return request1({
    url: `${propagandaPrefix}/print/notice/summary`,
    method: 'get'
  })
}

// 宣传品画面更新提醒消息为已读
export function updatePictureNotice(id) {
  return request1({
    url: `${propagandaPrefix}/picture/notice/${id}` ,
    method: 'PUT'
  })
}

// 物料制作更新提醒消息为已读
export function updateMaterialsNotice(id) {
  return request1({
    url: `${propagandaPrefix}/materials/notice/${id}` ,
    method: 'PUT'
  })
}

// 印刷品更新提醒消息为已读
export function updatePrintNotice(id) {
  return request1({
    url: `${propagandaPrefix}/print/notice/${id}` ,
    method: 'PUT'
  })
}



// 宣传品印刷品提醒更多提醒
export function getPrintList(query) {
  return request1({
    url: `${propagandaPrefix}/print/notice/list`,
    method: 'get',
    params:query
  })
}
// 物料提醒更多提醒
export function getApplicationList(query) {
  return request1({
    url: `${propagandaPrefix}/application/notice/list`,
    method: 'get',
    params:query
  })
}

// 物料印刷品提醒
export function getApplicationSummary() {
  return request1({
    url: `${propagandaPrefix}/application/notice/summary`,
    method: 'get'
  })
}

// 印刷品更新提醒消息为已读
export function updateApplicationNotice(id) {
  return request1({
    url: `${propagandaPrefix}/application/notice/${id}` ,
    method: 'PUT'
  })
}
