// handle meta ..
import {store} from "@/store/store";


async function getElementMeta({type,id}){
    return store.dispatch('getElementByKey',{
        type:type,
        id:id,
        key:'meta'
    })
}

async function setElementMeta({type,id,meta}){
    return store.dispatch('setElementByKey',{
        type:type,
        key:'meta',
        id:id,
        val:meta
    })
}

async function getElementTags({type,id}){
    let meta = await getElementMeta({type,id});
    return meta.tags;
}

async function setElementTags({type,id,tags}){
    let meta = await getElementMeta({type,id});
    meta.tags = tags;
    return setElementMeta({type,id,meta})
}

export {
    getElementMeta,
    setElementMeta,
    getElementTags,
    setElementTags
}