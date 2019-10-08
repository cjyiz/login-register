const dynamicRoutes = [
  {
    path: '/cjyiz1',
    component: () => import('../views/cjyiz1.vue'),
    name: 'cjyiz1'
  },
  {
    path: '/cjyiz2',
    component: () => import('../views/cjyiz1.vue'),
    name: 'cjyiz2'
  },
  {
    path: '/cjyiz3',
    component: () => import('../views/cjyiz1.vue'),
    name: 'cjyiz3'
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default dynamicRoutes
