import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './routes'
import {store} from "@/store/store";
import {firebase} from '@/firebase/firebase'


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})




router.beforeEach((to,from,next)=>{
    // console.log('there')
    // console.log(firebase.auth().currentUser)

    console.log(to.path, from.path)

    if(to.path === '/login' && from.path === '/dashboard') next('/')

    // if(to.path === '/login' && from.path === '/dashboard') console.log('twergwergwrgrrgws')
    // if((to.name === '/dashboard' || to.name === '/stuffspace') && $store.getters.isAuth) router.push({path:'/'})


    // if((to.name === '/login' || to.name === '/signup') && $store.getters.isAuth) next({name:'Dashboard'});
    // else if(to.meta.auth && store.getters.isAuth ) next();
    // else if( to.meta.auth === false ) next()
    // else next({name:'Home'})
    // console.log(store.getters.isAuth)
    // console.log('here')
    next()
})


export default router
