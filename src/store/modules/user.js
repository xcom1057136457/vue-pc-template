const MutationsType = {
  SETUSERINFO: 'SETUSERINFO'
}

export default {
  state: {
    userInfo: {}
  },
  getters: {

  },
  mutations: {
    /* 设置用户信息 */
    [MutationsType.SETUSERINFO](state, data){
      state.userInfo = data
    }
  },
  actions: {
    GET_USERINFO({ commit }, params){
      commit(MutationsType.SETUSERINFO, params)
    }
  }
}