import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'
import {store} from "@/store/store";
import router from '@/router/router'

var firebaseConfig = {
    apiKey: "AIzaSyDF4Fnlq9Mc6n22fXEy15SqyIDBIEb0mX8",
    authDomain: "tiamat-161eb.firebaseapp.com",
    databaseURL: "https://tiamat-161eb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tiamat-161eb",
    storageBucket: "tiamat-161eb.appspot.com",
    messagingSenderId: "783067150693",
    appId: "1:783067150693:web:f4d5f22896c7d166fd098c",
    measurementId: "G-8Z4RV7FXXV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// firebase.database.enableLogging(true);

const storage = firebase.storage();
// var storageRef = storage.ref();
// console.log(storageRef)

// should handle login ~persistancy
// if a user is auth then init the database handler
// and set the auth state to true
firebase.auth().onAuthStateChanged((user)=>{
    // console.log(user);
    if(user){
        store.dispatch('initDB',{uid:user.uid})
        store.dispatch('initStorage',{uid:user.uid})

        store.commit('authUser',)

        if(router.currentRoute.value.path === '/login') { // ako je na login stranici onda ga prebaci na prvi dash
            store.dispatch('getUser').then(a=>{
                router.push({path:'/dashboard',query:{id:a.dashboardID[0]}}); // open dashboard component with first dash id
            })
        }
        // handle smthing
        // console.log(store)
    }
    else{
        store.commit('unauthUser',)
        // router.push({path:'/'})
        // console.log(router.currentRoute)
        if(router.currentRoute.value.path === '/dashboard' || router.currentRoute.value.path === '/stuffspace') router.push({path:'/'})
        // console.log()
        // if(router.currentRoute.path)
    }
})

const database = firebase.database();

export {
    firebase,
    database,
    storage
}