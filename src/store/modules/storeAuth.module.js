import {firebase} from '@/firebase/firebase'
import router from "@/router/routes";

const state = {
    test: 'My first state!',
    UUID:'',
    isAuth:false,
    authError:'',


};
const getters = {
    isAuth(state){
        return state.isAuth;
    }
};
const actions = {
    signup(context,{email,password}){
        return new Promise((resolve, reject) => {
            firebase.auth()
                .createUserWithEmailAndPassword(email,password)
                .then((msg)=>{
                    context.commit('authUser')
                    // console.log('OK',msg)
                    resolve('OK')
                })
                .catch((err)=>{
                    context.commit('unauthUser')
                    // console.error('nope',err)
                    reject('auth error')
                })
        })
    },
    login(context,{email,password}){
        return new Promise((resolve, reject) => {
            firebase.auth()
                .signInWithEmailAndPassword(email,password)
                .then((msg)=>{
                    console.log('OK',msg)
                    context.commit('authUser')
                    resolve('OK');
                })
                .catch((err)=>{
                    console.error('nope',err)
                    context.commit('unauthUser')
                    reject('error')
                })
        })
    },
    resetPassword(context){
    //    TODO https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sendpasswordresetemail
    },
    signOut(context){
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            context.commit('unauthUser')
        }).catch((error) => {
            // An error happened., https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout
            context.commit('unauthUser')
        });
    }
};
const mutations = {
    authUser(state){
        state.isAuth = true;
    },
    unauthUser(state){
        state.isAuth = false;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}