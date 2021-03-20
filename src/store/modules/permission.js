/*
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-07-03 09:49:21
 * @LastEditors: CYZ
 * @LastEditTime: 2020-12-03 10:40:10
 */
const permission = {
  state: {
    sideRouters: [],
    navRouters: [],
    menuArr: [],

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

  },
  actions: {
    HANDLESIDEBAR({ commit }, data) {
      commit('handleSidebar', data)
    },

  }
}

export default permission
