import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar: {
      collapse: false
    }
  },
  getters: {},
  mutations: {
    handleCollapse(state) {
      state.sidebar.collapse = !state.sidebar.collapse;
    }
  },
  actions: {}
});
