import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import frame from './modules/frame'
import tagList from './modules/tagList'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    frame,
    tagList,
    user
  },
  plugins: [createPersistedState({
    storage: window.localStorage
  })]
})
