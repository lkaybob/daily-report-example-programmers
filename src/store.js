import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      startTime: undefined,
      lang: undefined
    }
  },
  getters: {
    savedSettings: (state) => {
      return state.settings
    }
  },
  // Action과 Mutation을 따로 둔 이유?
  // Shared Resource라서 그런가?
  mutations: {
    saveSettings: (state, payload) => {
      state.settings = payload
    }
  },
  actions: {
    saveSettings: ({commit}, payload) => {
      commit('saveSettings', payload)
    }
  }
})
