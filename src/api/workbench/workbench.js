/*
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-08-01 18:28:36
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-27 16:22:25
 */
import request from '@/utils/request'

import request1 from '@/utils/request1'
import { prefix as sustemPrefix } from '../system/system'
import { prefix as budgetPrefix } from '../budget/budget'
import { prefix as fundPrefix } from '../fund/fund'

// 工作台模块统计
export function getWorkList() {
  return request1({
    url: `${sustemPrefix}/home/module`,
    method: 'get',
  })
}

// 预算提醒
export function getBudgetNotice() {
    return request({
        url: `${budgetPrefix}/notice/summary`,
        method: 'get'
    })
}

// 更新预算提醒状态
export function updateBudgetNotice(id) {
  return request({
    url: `${budgetPrefix}/notice/` + id,
    method: 'PUT'
  })
}

// 客户资金提醒
export function getFundNotice() {
    return request({
        url: `${fundPrefix}/notice/summary`,
        method: 'get'
    })
}

// 更新客户资金提醒状态
export function updateFundNotice(id) {
  return request({
    url: `${fundPrefix}/notice/` + id,
    method: 'PUT'
  })
}

export function getWorkDetailList(module) {
    return request({
        url: '/work/list/'+module,
        method: 'get',
    })
}
