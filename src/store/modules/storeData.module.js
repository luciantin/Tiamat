import { dbHandler } from "@/firebase/rtDatabase";
import {firebase} from "@/firebase/firebase";

const state = {
    dashboard: [],
    stuffspace: [],
    container: [],
    group:[],
    section:[],
    item:[],

    isDbReady:false,
};
const getters = {
    getTest2(state){
        return state.test2;
    },
    getElement: (state) => ({type,id}) => {  return state[type][id];   },

    getDash: (state)=> {   return state.dashboard;  },
    getCnt: (state)=> {  return state.container;  },
    getGroup: (state)=> {  return state.group;  },
    getSec: (state)=> {  return state.section;  },
    getItem: (state)=> {  return state.item;  },

    isDbReady(state){ return state.isDbReady; },
};
const actions = {
    initDB(context,{uid}){ //firebase.auth().currentUser.uid
        dbHandler.qUID.set(uid);
        context.commit('initState');
        // console.log('DB INIT',uid)
        context.commit('setDbReady');
    },
    async getElement(context,{type,id}){
        if( await context.getters.getElement({type,id}) === undefined){
            await context.commit('setElement',{
                type,
                id,
                val: await dbHandler.qElement.get(type,id)
            })
            return context.getters.getElement({type,id})
        }
        else{
            return context.getters.getElement({type,id})
        }
        // check if its in vuex
        // if not get from db and save to vuex
        // return element
    },

    async getElements(context,{type,id}){
        return new Promise((resolve, reject) =>{
            resolve(
                Promise.all(
                    id.map(a=>context.dispatch('getElement',{
                        type:type,
                        id:a
            }))))

        } )
    },

    setElement(context,{type,id,val}){
        context.commit('setElement',{type,id,val})
        dbHandler.qElement.set(type,id,val);
        // change vuex element
        // inform db of change
    },

    // testAction(context){
    //     // dbHandler.qElement.getKey('container',2,'title').then(a=>console.log(a))
    //
    //     // setInterval(() => {
    //     //     context.commit('increment')
    //     // }, 1000)
    //
    //     return context.getters.test2;
    // }


};
const mutations = {
    initState(state){ // tu se treba sve izbrisati i unbinding napravit
        state.dashboard = [];
        state.stuffspace = [];
        state.container = [];
        state.group = [];
        state.section = [];
        state.item = [];
    },

    setElement(state,{type,id,val}){
        state[type][id] = val;
    },

    setDbReady(state){
        state.isDbReady = true;
    },
    setDbNotReady(state){
        state.isDbReady = false;
    },

    increment(state){
        state.test2 += 1;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}