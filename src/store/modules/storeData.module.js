import { dbHandler } from "@/firebase/rtDatabase";
import {firebase} from "@/firebase/firebase";

const state = {
    dashboard: {},
    stuffspace: {},
    container: {},
    group:{},
    section:{},
    item:{},

    isDbReady:false,
};
const getters = {
    getTest2(state){
        return state.test2;
    },
    getElement: (state) => ({type,id}) => {  return state[type][id];   },
    getElementByKey: (state) => ({type,id,key}) => {  return state[type][id][key];   },

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
        let elementsArray = new Array();
        let elementsDic = new Object();
        await Object.keys(id).map((index,key)=>{
            // console.log(key,index,id[key],id[index])
            let newElem = context.dispatch('getElement',{type:type,id:id[index]});
            elementsDic[id[index]] = newElem;
            elementsArray.push(newElem)
        })
        // console.log(elementsDic)
        // console.log(elementsArray)
        // await
        await Promise.all(elementsArray);
        return new Promise((resolve, reject) =>{

            Object.keys(elementsDic).map(a=>elementsDic[a].then(b=>elementsDic[a]=b))
            resolve(elementsDic)
        })
    },
//.then(arr=>{
//                 Object.keys(elementsDic).forEach((key,elem)=> elementsDic[key] = elementsDic[key].then(a=>{return a}))
//             }
// id.map(a=>context.dispatch('getElement',{
//     type:type,
//     id:a

    setElement(context,{type,id,val}){
        context.commit('setElement',{type,id,val})
        dbHandler.qElement.set(type,id,val);
        // change vuex element
        // inform db of change
    },


    async getElementByKey(context,{type,id,key}){
        if( await context.getters.getElement({type,id}) === undefined){
            await context.commit('setElement',{
                type,
                id,
                val: await dbHandler.qElement.get(type,id),
            })
            return context.getters.getElementByKey({type,id,key})
        }
        else{
            return context.getters.getElementByKey({type,id,key})
        }
    },
    setElementByKey(context,{type,id,val,key}){
        // console.log(type,id,val,key,context)

        context.commit('setElementByKey',{type,id,val,key})
        dbHandler.qElement.setKey(type,id,key,val);
    },
    setSubElementByKey(context,{type,id,val,key,subKey}){
        context.commit('setSubElementByKey',{type,id,val,key,subKey})
        let tmpKey = key+'/'+subKey;
        dbHandler.qElement.setKey(type,id,tmpKey,val);
    },

};
const mutations = {
    initState(state){ // tu se treba sve izbrisati i unbinding napravit
        state.dashboard = {};
        state.stuffspace = {};
        state.container = {};
        state.group = {};
        state.section = {};
        state.item = {};
    },

    setElement(state,{type,id,val}){
        // console.log(type,id,val)
        // console.log(state)
        state[type][id] = val;
    },
    setElementByKey(state,{type,id,val,key}){
        state[type][id][key] = val;
    },
    setSubElementByKey(state,{type,id,val,key,subKey}){
        // console.log(state,type,id,key,subKey,val)
        state[type][id][key][subKey] = val;
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