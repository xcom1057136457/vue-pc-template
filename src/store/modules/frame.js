const mutationTypes = {
  CHANGECOLLAPSE: 'CHANGECOLLAPSE'
}
export default {
  state: {
    isCollapse: false
  },
  mutations: {
    [mutationTypes.CHANGECOLLAPSE](state,data){
      state.isCollapse = data
    }
  },
  actions: {
    setIsCollapse(context,data){
      context.commit(mutationTypes.CHANGECOLLAPSE,data)
    }
  }
}