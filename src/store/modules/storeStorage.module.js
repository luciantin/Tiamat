import {StorageHandler} from "@/firebase/StorageHandler";
import {storage} from "@/firebase/firebase";

const state = {

};
const getters = {

};
const actions = {
    initStorage(context,{uid}){ //firebase.auth().currentUser.uid
        StorageHandler.qUID.set(uid);
    },
    getFileURL(context,{filename}){
        return StorageHandler.getFileURL(filename)
    },
    putFile(context,{filename,file}){ //BLOB probably...
        return StorageHandler.putFile(filename,file)
    }
};
const mutations = {

};
export default {
    state,
    getters,
    actions,
    mutations
}