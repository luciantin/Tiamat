import {store} from "@/store/store";
import {ElementsFactory} from "@/factory/elementsFactory/elementsFactory";

const CreateNewDashboard = function(){
    let newDashboardID;


    return newDashboardID;
}

const CreateNewStuffspace = function (gridID){
    let newStuffspaceID;


    return newStuffspaceID;
}

const CreateNewContainer = function (gridID){
    let elFac = new ElementsFactory();

    let meta = elFac.createMeta({
        title:'Dash',
        description:'new Dash',
        tags: ['Dash']
    })

    let firstCnt = elFac.createContainer({
        groupID:[],
        pos:{w:1,h:2,x:1,y:1},
        innerGrid:{rows:2,cols:2},
        groupPos:{
            // '1':{w:1,h:1,x:1,y:1},
            // '0':{w:1,h:1,x:1,y:2}
        },
        meta:meta
    })

    return new Promise((resolve, reject) => {
        store.dispatch('getNewID',{type:'container'}).then(newKey => {

            store.dispatch('getElementByKey',{
                type:'dashboard',
                id:gridID,
                key:'containerID'
            }).then(a=>{
                let IDs = Object.values(a);
                IDs.push(newKey)
                Promise.all([
                    store.dispatch('setElement',{
                        type:'container',
                        id:newKey,
                        val:firstCnt
                    }),
                    store.dispatch('setElementByKey',{
                        type:'dashboard',
                        id:0,
                        key:'containerID',
                        val:IDs
                    }),
                ]).then(values =>{
                    resolve(newKey)
                }).catch(err=>{
                    reject(err)
                })
            })
        })
    })
}


const CreateNewGroup = function (CntID){
    let newGroupID;


    return newGroupID;
}

const CreateNewSection = function (GrpID){
    let newSectionID;


    return newSectionID;
}


export {
    CreateNewContainer,
    CreateNewDashboard,
    CreateNewGroup,
    CreateNewSection,
    CreateNewStuffspace
}