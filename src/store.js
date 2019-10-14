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
    list: {
      cjyiz1: false,
      cjyiz2: false,
      cjyiz3: false
    }

  },
  getters: {
    userInfo: state => {
      return state.userInfo
    },
    list: state => {
      return state.list
    }
  },
  mutations: {
    SET_TOKEN (state, userInfo) {
      state.userToken = userInfo.name

    },
    SET_USER (state, userInfo) {
      state.userInfo.name = userInfo.name
      state.userInfo.role = userInfo.role
    },
    SET_LIST1 (state, cjyiz) {
      state.list.cjyiz1 = cjyiz
    },
    SET_LIST2 (state, cjyiz) {
      state.list.cjyiz2 = cjyiz
    },
    SET_LIST3 (state, cjyiz) {
      state.list.cjyiz3 = cjyiz
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
