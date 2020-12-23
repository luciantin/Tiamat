// USER DATA IN DB, not auth

import { dbHandler } from "@/firebase/rtDatabase";

const state = {

    User:{}

};
const getters = {

    getUser(state){
        return state.User;
    }

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

};
const mutations = {
    initState(state){ // tu se treba sve izbrisati i unbinding napravit
        state.User={};
    },

    setUser(state,val){
        state.User = val;
    },

};
export default {
    state,
    getters,
    actions,
    mutations
}