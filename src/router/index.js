import User from '@/views/User'
import UserHistory from '@/views/UserHistory'
import UserTransactions from '@/views/UserTransactions'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserAuth from '@/views/UserAuth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user/auth',
    name: 'UserAuth',
    component: UserAuth
  },
  {
    path: '/user/:userId',
    name: 'User',
    component: User
  },
  {
    path: '/user/history',
    name: 'UserHistory',
    component: UserHistory
  },
  {
    path: '/user/transactions/create',
    name: 'UserTransactions',
    component: UserTransactions
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
