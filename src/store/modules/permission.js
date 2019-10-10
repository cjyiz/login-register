import { routes, dynamicRouter } from '@/router'

// 使用meta.role来判断当前用户是否有权限
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    //includes数组是否包含一个值
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

//递归过滤路由表
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    // tmp为路由表对象
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}
// 提交更改路由设置，动态添加路由
const mutations = {
  SET_ROUTES: (state, route) => {
    state.addRoutes = route
    state.routes = routes.concat(route)
  }
}


const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = dynamicRouter || []
      } else {
        accessedRoutes = filterAsyncRoutes(dynamicRouter, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}







