import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [

    {
      path: '/home',
      // name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:id',
      name: 'user',
      meta: { requiresAuth: true },
      component: () => import('../views/cjyiz.vue')
      // 切记不能写成如下页面
      // component: () =>{import('../views/cjyiz2.vue')} 
    },
    // {
    //   path: '/cjyiz1',
    //   name: 'user',
    //   component: () => import('../views/cjyiz1.vue')
    // },
    // {
    //   path: '/cjyiz2',
    //   name: 'cjyiz2',
    //   component: () => import('../views/cjyiz2.vue')
    // },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    }, {
      //配置这里，结合路由守卫，才能搞定输入url第一次页面不过滤的问题
      path: "*",
      redirect: '/login'
    }
  ]
})
