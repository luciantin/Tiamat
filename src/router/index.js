import { createRouter, createWebHistory } from 'vue-router'
import PathNotFound from "@/views/PathNotFound";
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/features',
    name: 'Features',
    component: () => import(/* webpackChunkName: "about" */ '../views/Features.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/taskspace',
    name: 'Taskspace',
    component: () => import(/* webpackChunkName: "about" */ '../views/Taskspace.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pricing.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import(/* webpackChunkName: "about" */ '../views/Demo.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PathNotFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
