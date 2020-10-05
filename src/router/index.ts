import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import(/* webpackChunkName: 'layout' */ '@/layout/index.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue')
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: '/menu-create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue')
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
        // meta: {
        //   requiresAuth: true
        // }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'aadvert-space' */ '@/views/advert-space/index.vue')
        // meta: {
        //   requiresAuth: true
        // }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
