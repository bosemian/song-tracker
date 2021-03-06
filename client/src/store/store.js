import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },

  mutations: {
    setToken (state, payload) {
      state.token = payload
      if (payload) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, payload) {
      state.user = payload
    }
  },

  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    }
  },

  getters: {
    getCurrentUser (state) {
      return { ...state }
    }
  }
})
