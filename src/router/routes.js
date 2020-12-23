import PathNotFound from "@/views/PathNotFound";

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta:{
      auth:false,
      nav:true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta:{
      auth:false,
      nav:true
    }
  },
  {
    path: '/features',
    name: 'Features',
    component: () => import('../views/Features.vue'),
    meta:{
      auth:false,
      nav:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta:{
      auth:false,
      nav:true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
    meta:{
      auth:false,
      nav:true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue'),
    meta:{
      auth:false,
      nav:true
    }
  },
  {
    path: '/stuffspace',
    name: 'Stuffspace',
    component: () => import('../views/StuffSpace.vue'),
    meta:{
      auth:true,
      nav:false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta:{
      auth:true,
      nav:false
    }
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import('../views/Pricing.vue'),
    meta:{
      auth:false,
      nav:true
    }
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/Demo.vue'),
    meta:{
      auth:false,
      nav:true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PathNotFound,
    meta:{
      auth:false,
      nav:true
    }
  }
]
