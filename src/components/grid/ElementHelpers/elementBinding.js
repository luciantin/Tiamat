// za spajanje elemenata u polja
import {store} from "@/store/store";





const RemoveSection = function (secID,groupID){
    // console.log('Section removed')
    // console.log(secID,groupID)
    return new Promise(resolve => {
        store.dispatch('getElementByKey',{
            type:'group',
            id:groupID,
            key:'sectionID'
        }).then(sectionID=>{
            let tmpSecID = Array.from(sectionID);
            tmpSecID.splice(tmpSecID.indexOf(secID),1);

            store.dispatch('setElementByKey',{
                type:'group',
                id:groupID,
                key:'sectionID',
                val:tmpSecID
            })
        })
    })
}

// -1 za zadnje mjesto
const AddSection = function (secID,groupID,secIndex){
    // console.log('Section added')
    // console.log(secID,groupID,secIndex)
    return new Promise(resolve => {
        store.dispatch('getElementByKey',{
            type:'group',
            id:groupID,
            key:'sectionID'
        }).then(sectionID=>{

            let tmpSecID = Array.from(sectionID);
            if(secIndex === -1) tmpSecID.push(Number(secID));
            else tmpSecID.splice(secIndex,0,secID);

            store.dispatch('setElementByKey',{
                type:'group',
                id:groupID,
                key:'sectionID',
                val:tmpSecID
            })
        })
    })
}


export {
    RemoveSection,
    AddSection
}