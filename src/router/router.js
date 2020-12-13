import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './routes'
import {store} from "@/store/store";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to,from,next)=>{
    if((to.name === '/login' || to.name === '/signup') && $store.getters.isAuth) next({name:'Dashboard'});
    else if(to.meta.auth && store.getters.isAuth ) next();
    else if( to.meta.auth === false ) next()
    else next({name:'Home'})
    // console.log(store.getters.isAuth)
    // next()
})



export default router
