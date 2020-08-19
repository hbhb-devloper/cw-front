/*
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-07-03 09:49:21
 * @LastEditors: CYZ
 * @LastEditTime: 2020-08-04 14:11:36
 */
const permission = {
  state: {
    sideRouters: [],
    navRouters: [],
    menuArr: [],
    projectId: undefined,
    budgetSelect:{}
  },
  mutations: {
    SET_SIDEROUTERS: (state, sideRouters) => {
      state.sideRouters = sideRouters
    },
    SET_NAVROUTERS: (state, navRouters) => {
      state.navRouters = navRouters
    },
    handleSidebar: (state, id) => {
      state.menuArr = []
      state.menuArr.push(state.sideRouters[id])
    },
    handleProjectId: (state, id) => {
      state.projectId=id;
    },
    setBudgetSelect:(state,data)=>{
      state.budgetSelect=data;
    },
    setBudgetRest:(state,data)=>{
      state.budgetSelect=data;
    }
  },
  actions: {
    HANDLESIDEBAR({ commit }, data) {
      commit('handleSidebar', data)
    },
    PROJECTID({ commit }, id) {
      commit('handleProjectId', id)
    },
    SET_BUDGET_SELECT({commit},data){
      commit('setBudgetSelect',data);
    }
  }
}

export default permission
