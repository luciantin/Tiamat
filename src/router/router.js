import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './routes'
import {store} from "@/store/store";
import {firebase} from '@/firebase/firebase'


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})




// const router = createRouter({
//     history: createWebHistory("/"),
//     mode:'history',
//     base: "/",
//     routes
// })


router.beforeEach((to,from,next)=>{

    // console.log(firebase.auth().currentUser)
    if((to.name === '/dashboard' || to.name === '/taskspace') && $store.getters.isAuth) router.push({path:'/'})
    // if((to.name === '/login' || to.name === '/signup') && $store.getters.isAuth) next({name:'Dashboard'});
    // else if(to.meta.auth && store.getters.isAuth ) next();
    // else if( to.meta.auth === false ) next()
    // else next({name:'Home'})
    // console.log(store.getters.isAuth)
    next()
})
//
// function CheckForLogin(){
//     if(!$store.getters.isAuth && firebase.auth().currentUser){
//
//     }
// }

export default router
