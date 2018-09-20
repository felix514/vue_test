import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    LOADING:false
  },
  mutations:{
    showLoading(state){
      state.LOADING = true
    },
    hideLoading(state){
      this.state.LOADING = false
    }
  }
})
export default store
