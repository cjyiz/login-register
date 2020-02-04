import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // isLogin: false,
    userToken: '',
    userInfo: {
      name: '',
      role: ''
    },
    count:0

  },
  getters: {
    userInfo: state => {
      return state.userInfo
    }
  },
  mutations: {
    SET_TOKEN (state, userInfo) {
      state.userToken = userInfo.name

    },
    cjyiz:state=>{
      state.count++
    },
    SET_USER (state, userInfo) {
      state.userInfo.name = userInfo.name
      state.userInfo.role = userInfo.role
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      commit('SET_TOKEN', userInfo)
      commit('SET_USER', userInfo)
    },
    logout ({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_USER', '')
      // removeToken()
    },
    //1.可以包含异步操作2.通过提交mutations改变状态3.通过dispatch分发
    // getInfo ({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(res => {
    //       const { data } = res
    //       if (!data) {
    //         // reject('拒绝访问)
    //       }
    //       const { roles, name, avatar } = data
    //       if (!roles || roles.length <= 0) {
    //         reject('')
    //       }
    //     })
    //   })
    // }
  }
})
