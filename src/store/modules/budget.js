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
    radio:3,
    notice: 0
  },
  mutations:{
    handleProjectId: (state, id) => {
      state.projectId = id;
    },
    setBudgetSelect: (state, data) => {
      state.budgetSelect = data;
    },
    setNotice: (state) => {
      state.notice=state.notice+1;
    },
    setRadio:(state,data)=>{
      state.radio=data;
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
    },
    SET_BUDGET_RADIO({commit},data){
      commit('setRadio',data);
    }
  }
}

export default budget
