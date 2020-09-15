const budget ={
  state:{
    projectId: undefined,
    budgetSelect: {
      //顶部条件查询
      unitId: undefined,
      projectYear: '',
      createTime: '',
      budgetId: undefined,
      projectName: undefined,
      projectNum: undefined,
      state: undefined,
      pageNum: 1, //页码
      pageSize: 20,
    },
    notice: 0
  },
  mutations:{
    handleProjectId: (state, id) => {
      state.projectId = id;
    },
    setBudgetSelect: (state, data) => {
      console.log('Vdata',data);
      state.budgetSelect = data;
    },
    setBudgetRest: (state, data) => {
      state.budgetSelect = data;
    },
    setNotice: (state) => {
      state.notice=state.notice+1;
    }
  },
  actions:{
    PROJECTID({commit}, id) {
      commit('handleProjectId', id)
    },
    SET_BUDGET_SELECT({commit}, data) {
      commit('setBudgetSelect', data);
    },
    SET_GETNOTICE({commit}) {
      commit('setNotice')
    }
  }
}

export default budget
