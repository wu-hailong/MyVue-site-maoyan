import store from "store"
let { id , nm} = store.get("currentCity") || {id:1,nm:"北京"}
const state = {
    cityId:id,
    nm
}
const mutations = {
  setCity(state,{id , nm}){
    state.cityId = id
    state.nm = nm
  }
}

const actions = {
  saveCity({commit},payload ){
    commit('setCity',payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}