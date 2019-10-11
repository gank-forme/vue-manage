import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  userData:'',
}
const actions={
  //homeData:'',
}
const mutations ={
  userFun (state,data){
    state.userData=data
  }
}
const getters = {

}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{}
})
