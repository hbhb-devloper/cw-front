/*
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-09-23 14:42:03
 * @LastEditors: CYZ
 * @LastEditTime: 2020-10-12 15:45:02
 */

import request from '@/utils/request'



// 查询迁改涉财统计列表
export function listRefinance(query) {
    function deepClone(obj) {
        let result = typeof obj.splice === "function" ? [] : {};
        if (obj && typeof obj === 'object') {
            for (let key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    result[key] = deepClone(obj[key]); //如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
                } else {
                    result[key] = obj[key]; //如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
                }
    
            }
            return result;
        }
        return obj;
    }
    let queryParams=deepClone(query)
    if (queryParams.contractNum) {
        queryParams.contractNum = encodeURI(
            queryParams.contractNum
        );
      }
    return request({
        url: '/refinance/list',
        method: 'get',
        params: queryParams
    })
}
