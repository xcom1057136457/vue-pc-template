const MutationType = {
  SETTAGLIST: "SETTAGLIST",
  REMOVETAGLIST: 'REMOVETAGLIST',
  CLOSEOTHER: 'CLOSEOTHER',
  CLOSEALL: 'CLOSEALL',
  CLOSENOW: 'CLOSENOW'
}
export default {
  state: {
    tagList: []
  },
  mutations: {
    [MutationType.SETTAGLIST](state, data) {
      state.tagList.push(data)
    },
    [MutationType.REMOVETAGLIST](state, data) {
      state.tagList.forEach((item, index, arr) => {
        if (item.path == data.path) {
          arr.splice(index, 1)
        }
      })
    },
    [MutationType.CLOSEOTHER](state, data) {
      state.tagList = state.tagList.filter((item) => {
        return item.path == data
      })
    },
    [MutationType.CLOSEALL](state) {
      state.tagList = []
    },
    [MutationType.CLOSENOW](state, data) {
      state.tagList = state.tagList.filter((item) => {
        return item.path != data
      })
    }
  },
  actions: {
    // 获取tagList
    GET_TAGLIST({
      commit
    }, data) {
      commit(MutationType.SETTAGLIST, data)
    },
    // 删除tagList值
    REMOVE_TAGLIST({
      commit
    }, data) {
      commit(MutationType.REMOVETAGLIST, data)
    },
    // 关闭其他标签
    CLOSE_OTHER({
      commit
    }, data) {
      commit(MutationType.CLOSEOTHER, data)
    },
    CLOSE_ALL({
      commit
    }) {
      commit(MutationType.CLOSEALL)
    },
    CLOSE_NOW({
      commit
    }, data) {
      commit(MutationType.CLOSENOW, data)
    }
  }
}