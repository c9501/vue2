import Vue from 'vue'
import Vuex from 'vuex'
import { userinfoApi } from "@/request/api"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userInfo:{}
  },
  getters: {
    // getuserinfo(state){
    //   userinfoApi().then(res=>{
    //    state.userInfo = res.data.data
    //   })
    // }

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
