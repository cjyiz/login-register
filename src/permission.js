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
      try {
        const { role } = await store.dispatch('user/getInfo')
        const accessRoutes = await store.dispatch(
          'permission/generateRoutes',
          roles
        )
        router.addRoutes(accessRoutes)
      } catch (err) {
        // 这种写法是user文件下的resetToken
        await store.dispatch('user/resetToken')
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
