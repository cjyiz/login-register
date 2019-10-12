import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import dynamicRouter from './router/dynamicRouter.js'
import store from './store'
import VueResource from 'vue-resource'
Vue.config.productionTip = false
Vue.use(VueResource)
//在页面加载时读取sessionStorage里的状态信息
if (sessionStorage.getItem("store")) {
  store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem("store"))))
}
//在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("store", JSON.stringify(store.state))
})
router.beforeEach((to, from, next) => {
  console.log(router)
  console.log(dynamicRouter)
  let accessRoutes =
    (() => {
      for (let i = 0; i < dynamicRouter.length; i++)

        if (dynamicRouter[i].meta.role === 'admin') {
          return item
        }
    })
  // const accessRoutes = dynamicRouter.map((item) => {
  //   console.log(item.meta)

  // })
  console.log(accessRoutes)
  router.addRoutes(accessRoutes)
  // console.log(store.state.userToken)
  // console.log(to.matched.some(m => m.meta.requiresAuth))
  const role = store.getters.userInfo.role
  console.log(role)
  if (to.matched.some(m => m.meta.requiresAuth)) {
    if (store.state.userToken) {
      console.log('登录状态')
      if (role === 'admin') {
        console.log('管理员的权限访问')

        router.addRoutes(dynamicRouter)
        console.log(router)
      }
      next()
    } else {
      if (to.path === '/login') {
        console.log('登录')
        next()
      } else {
        console.log('没有登陆')
        next({ path: '/login' })
      }
    }
  } else {
    next()
  }

})
new Vue({
  router,
  dynamicRouter,
  store,
  render: h => h(App)
}).$mount('#app')

// console.log(dynamicRouter)
// router.beforeEach((to, from, next) => {
//   if (!store.state.userToken) {
//   }
// })
//写法一
// router.beforeEach((to, from, next) => {
//   if (!store.state.userToken) {
//     //检查是否有用户token
//     //没有就检查是否匹配路由，如果大于0，并且路由元没有要求路由信息就继续
//     if (
//       to.matched.length > 0 &&
//       !to.matched.some(record => record.meta.requiresAuth)
//     ) {
//       next()
//     } else {
//       //如果没有匹配到路由元，或者访问的路由需要权限就进入登录页面
//       next({ path: '/login' })
//     }
//   } else {
//     if (!store.state.permission.permissionList) {
//       //如果store中的没有许可信息,分发行为，判断并决定后续如果操作
//       store.dispatch('permission/FETCH_PERMISSION').then(() => {
//         next({ path: to.path })
//       })
//     } else {
//       if (to.path !== '/login') {
//         next()
//       } else {
//         // 当前要离开路由的完整路径
//         next(from.fullPath)
//       }
//     }
//   }
// })


//写法二
// router.beforeEach(async (to, from, next) => {
//   if (store.state.userToken) {
//     if (to.path == '/login') {
//       next({ path: '/' })
//     } else {
//       //通过登录后的用户角色，检查是否有权限
//       const hasRoles = store.getters.roles && store.getters.roles.length > 0
//       if (hasRoles) {
//         next()
//       } else {
//         try {
//           const { roles } = await store.dispatch('user/getInfo')
//           const accessRoutes = await store.dispatch(
//             'permission/generateRoutes',
//             roles
//           )
//           router.addRoutes(accessRoutes)
//           next({ ...to, replace: true })
//         } catch (err) {
//           await store.dispatch('user/resetToken')
//           next('/login?redirect=${to.path}')
//         }
//       }
//     }
//   }
// })
