import router from './router/router'
import store from './store'
import dynamicRouter from './router/dynamicRouter'
import { getToken } from '@/utils/auth'

// 定义白名单
const whiteList = ['/login', 'auth-redirect']

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 拉取用户信息
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/genetateRoutes', roles)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (err) {
          await store.dispatch('user/resetToken')
          // next(`/`)??????
          // 重定向到错误页面
          next()
        }
      }

    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 重定向到错误页面
      next()
    }
  }
})
