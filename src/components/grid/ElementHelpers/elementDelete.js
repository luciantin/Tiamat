// f za brisanje elem.
import {store} from "@/store/store";

// delete group from container
// get container
// remove groupID from groupId
// remove groupID from groupPos


const DeleteGroupFromContainer = function (groupID,containerID){
    // console.log(groupID,containerID)
    let deleteGrpArrID = new Promise((resolve, reject) =>{
        store.dispatch(
            'getElementByKey', {
                type:'container',
                id:containerID,
                key:'groupID'
            }).then((grpID)=>{
            let tmpGrpID = Array.from(grpID);
            tmpGrpID.splice(tmpGrpID.indexOf(Number(groupID)),1);

            store.dispatch('setElementByKey',{
                type:'container',
                id:containerID,
                key:'groupID',
                val:tmpGrpID
            }).then(()=>{
                resolve();
            })
        })
    })

    let deleteGrpPos = store.dispatch(
            'setSubElementByKey', {
                type:'container',
                id:containerID,
                key:'groupPos',
                subKey:String(groupID),
                val:'',
            })


    return Promise.all([deleteGrpArrID,deleteGrpPos]);
}


const DeleteContainer = function (gridID,cntID,GridType){

    // console.log(gridID,cntID);

    let delFromGrid = new Promise((resolve => {
        return store.dispatch('getElementByKey',{
            type:GridType,
            id:gridID,
            key:'containerID'
        }).then((resp)=>{
            let tmpCntID = Array.from(resp);
            // console.log(tmpCntID)
            // console.log(cntID)
            // console.log(tmpCntID.splice(tmpCntID.indexOf(Number(cntID)),1))

            store.dispatch('setElementByKey',{
                type:GridType,
                id:gridID,
                key:'containerID',
                val:tmpCntID
            }).then(()=>{
                resolve()
            })
        })
    }))

    return delFromGrid;
}

const DeleteSection = function (groupID,sectionID){

    let delFromGroup = new Promise((resolve => {
        return store.dispatch('getElementByKey',{
            type:'group',
            id:groupID,
            key:'sectionID'
        }).then((resp)=>{
            let tmpSecID = Array.from(resp);
            // console.log(tmpSecID)
            // console.log(groupID,sectionID)
            // console.log(tmpSecID.splice(tmpSecID.indexOf(Number(sectionID)),1))
            tmpSecID.splice(tmpSecID.indexOf(Number(sectionID)),1)
            store.dispatch('setElementByKey',{
                type:'group',
                id:groupID,
                key:'sectionID',
                val:tmpSecID
            }).then(()=>{
                resolve()
            })
        })
    }))
    return delFromGroup;

}


export {
    DeleteGroupFromContainer,
    DeleteContainer,
    DeleteSection
}