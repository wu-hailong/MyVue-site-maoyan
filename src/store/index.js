import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import cities from './cities'

export default new Vuex.Store({
  modules: {
    cities
  },
  state: {
    isSticky:false
  },
  mutations: {
    setSticky(state,payload){
      state.isSticky = payload
    }
  },
  actions: {
  }
})
