// USER DATA IN DB, not auth

import { dbHandler } from "@/firebase/rtDatabase";

const state = {

    User:{},
    elementIdTypeKey : {
        'dashboard':'nextDsbID',
        'stuffspace':'nextStfID',
        'container':'nextCntID',
        'group':'nextGrpID',
        'section':'nextSecID',
        'item':'nextItemID'
    }

};
const getters = {

    getUser(state){
        return state.User;
    },
    // getCounter: (state) => (type) => { return state.User.counters[state.elementIdTypeKey[type]]}

    // getUser: (state) => ({type,id}) => {
    //     console.log(state,type,id)
    //     return state[type][id];
    // }
};
const actions = {

    async getUser(context){
       context.commit('setUser',await dbHandler.qUser.get());
       return context.getters.getUser
    },

    setUser(context,data){
        context.commit('setUser',data);
        dbHandler.qUser.set(data)
        // change vuex element
        // inform db of change
    },

    async getNewID(context,{type}){
        let key = context.state.elementIdTypeKey[type]
        let oldVal = await dbHandler.qUser.getCounterKey(key)
        dbHandler.qUser.setCounterKey(key,oldVal+1);
        return oldVal+1;
    }

};
const mutations = {
    initState(state){ // tu se treba sve izbrisati i unbinding napravit
        state.User={};
    },

    setUser(state,val){
        state.User = val;
    },
    // incCounter(state,type){
    //     state.User.counters[state.elementIdTypeKey[type]] += 1;
    // }

};
export default {
    state,
    getters,
    actions,
    mutations
}