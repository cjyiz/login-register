import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userToken: ''
  },
  getter: {},
  mutations: {
    increment(state) {
      state.isLogin = true
      // console.log('执行没有') //在仗剑天涯行之前执行
    }
  },
  actions: {
    //1.可以包含异步操作2.通过提交mutations改变状态3.通过dispatch分发
    increment(context) {
      context.commit('increment')
      // console.log('仗剑天涯行')
    }
  }
})
