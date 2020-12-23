import {firebase} from '@/firebase/firebase'

const state = {
    test: 'My first state!',
    isAuth:false,
    authError:'',
};
const getters = {
    isAuth(state){
        return state.isAuth;
    },
};
const actions = {
    signup(context,{email,password}){
        return new Promise((resolve, reject) => {
            firebase.auth().signOut();
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){
                firebase.auth().createUserWithEmailAndPassword(email,password)
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
        })
    },
    login(context,{email,password}){
        return new Promise((resolve, reject) => {
            firebase.auth().signOut();
            //firebase.auth()
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
                firebase.auth().signInWithEmailAndPassword(email, password)
                        .then((msg) => {
                            console.log('OK', msg)
                            context.commit('authUser')
                            resolve('OK');
                            console.log(firebase)
                        })
                        .catch((err) => {
                            console.error('nope', err)
                            context.commit('unauthUser')
                            reject('error')
                        })
            })
        })
    },
    resetPassword(context){ // TODO nikad prob
    //    TODO https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sendpasswordresetemail
    },

    logOut(context){

        firebase.auth().signOut().then(() => {            // Sign-out successful.
            context.commit('unauthUser')
        }).catch((error) => {             // An error happened., https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout
            context.commit('unauthUser')
        });
    },
};
const mutations = {
    authUser(state){
        state.isAuth = true;
    },
    unauthUser(state){
        state.isAuth = false;
    },

};
export default {
    state,
    getters,
    actions,
    mutations
}