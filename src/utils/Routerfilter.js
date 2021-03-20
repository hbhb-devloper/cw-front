/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param namefilter
 * @param route
 */
function hasPermission(namefilter, route) {
    if (route.meta.title) {
        return namefilter.some(role => route.meta.title.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param namefilter
 */
function filterAsyncRouter(routes, namefilter) {
    console.log('namefilter', namefilter);
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(namefilter, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, namefilter)
            }
            res.push(tmp)
        }
    })
    
    return res
}

