const dynamicRoutes = [
  {
    path: '/cjyiz1',
    component: () => import('../views/cjyiz1.vue'),
    name: 'cjyiz1',
    meta: {
      role: ['user', 'visit'],
      requireAuth: true
    }
  },
  {
    path: '/cjyiz2',
    component: () => import('../views/cjyiz2.vue'),
    name: 'cjyiz2',
    meta: {
      role: ['user'],
      requireAuth: true
    }
  },
  {
    path: '/cjyiz3',
    component: () => import('../views/cjyiz3.vue'),
    name: 'cjyiz3',
    meta: {
      role: ['admin'],
      requireAuth: true
    }
  },

]

export default dynamicRoutes
