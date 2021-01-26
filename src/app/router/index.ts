import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: () => import('../about/views/About.vue')
  },
  {
    path: '/apod/today',
    component: () => import('../views/About.vue')
  },
  {
    path: '/apod/all-pictures',
    component: () => import('../views/About.vue'),
    children: [
      {
        path: ':date',
        component: () => import('../views/About.vue') 
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
