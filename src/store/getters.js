const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    projectdata: state => state.app.projectdata,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    nickName:state=>state.user.nickname,
    unitName:state=>state.user.unitName,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    // 用户的权限
    permissions: state => state.user.permissions,
    // 用户的菜单路由
    sideRouters: state => state.permission.sideRouters,
    navRouters: state => state.permission.navRouters,
    submen: state => state.permission.menuArr,
    projectIds:state=>state.budget.projectId,
    budgetSelect:state=>state.budget.budgetSelect,
    notices:state=>state.budget.notice,
    radioVal:state=>state.budget.radio,
}
export default getters
