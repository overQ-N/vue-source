import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'overQ',
    num: 0
  },
  getters: {
    doubleNum(state) {
      return state.num * 2
    }
  },
  mutations: {
    syncAdd(state, payload) {
      state.num += payload
    },
    asyncMinus(state, payload) {
      state.num -= payload
    }
  },
  actions: {
    asyncMinus({ commit, dispatch }, payload) {
      commit("asyncMinus", payload)
    }
  },
  modules: {
  }
})
