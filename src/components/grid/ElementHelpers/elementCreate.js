import {store} from "@/store/store";
import {ElementsFactory} from "@/factory/elementsFactory/elementsFactory";

// get new dash ID
// create new container
// create new group
// create new section
// create new Item > Stuffspace
async function CreateNewDashboard(data){

    let newDashboardID = await store.dispatch('getNewID',{type:'dashboard'})

    data.item.content = await CreateNewStuffspace(data.dashboard, data.container)

    // console.log(data)
    await store.dispatch('setElement',{
        type:'dashboard',
        id:newDashboardID,
        val:data.dashboard
    })

    let containerID = await CreateNewContainer(newDashboardID,data.container)
    let groupID = await CreateNewGroup(containerID, data.group)
    let sectionID = await CreateNewSection(groupID, data.section)
    let itemID = await CreateNewItem(sectionID, data.item)



    return newDashboardID;
}


// get new stuffsp ID
// create new container
async function CreateNewStuffspace(StfData, CntData){
    let newStuffSpaceID = await store.dispatch('getNewID',{type:'stuffspace'})

    await store.dispatch('setElement',{
        type:'stuffspace',
        id:newStuffSpaceID,
        val:StfData
    })

    await CreateNewContainer(newStuffSpaceID, CntData, 'stuffspace')

    return newStuffSpaceID;
}

async function CreateNewContainer(gridID,CntData,type){
    let elFac = new ElementsFactory();
    let firstCnt = CntData;

    let GridType = 'dashboard'

    if(type !== undefined) GridType = type;


    if(firstCnt === undefined) {
        firstCnt = elFac.createContainer({
            groupID: [],
            pos: {w: 1, h: 1, x: 1, y: 1},
            innerGrid: {rows: 2, cols: 2},
            groupPos: {},
            meta: elFac.createMeta({
                title: 'New',
                description: 'New',
                tags: ['Container']
            })
        })
    }

    let newContainerKey = await store.dispatch('getNewID',{type:'container'});
    let containerIDs = await store.dispatch(
        'getElementByKey',{
            type:GridType,
            id:gridID,
            key:'containerID'
        })
    // console.log(containerIDs)

    let IDs = []
    if( containerIDs !== undefined) IDs = Object.values(containerIDs);

    IDs.push(newContainerKey)

    await Promise.all([
        store.dispatch('setElement',{
            type:'container',
            id:newContainerKey,
            val:firstCnt
        }),
        store.dispatch('setElementByKey',{
            type:GridType,
            id:gridID,
            key:'containerID',
            val:IDs
        }),
    ])


    return newContainerKey;
}


const CreateNewGroup = function (CntID, GrpData){
    let newGroupID;
    let newGroup = GrpData;
    let elFac = new ElementsFactory();

    if(GrpData === undefined) {
        newGroup = elFac.createGroup({
            sectionID: [],
            meta: elFac.createMeta({
                title: 'New',
                description: 'New',
                tags: ['Group']
            })
        })
    }

    return new Promise((resolve, reject) => {

        store.dispatch('getNewID',{type:'group'}).then(newKey => { // get new group id
            // console.log(newKey)
            store.dispatch('setElement',{ // add new group to DB
                type:'group',
                id:newKey,
                val:newGroup
            }).then(a=>{ // update container with new group ID and pos
                store.dispatch('getElement',{ // get the latest container data to update it
                    type:'container',
                    id:CntID
                }).then(cnt=>{ // update container with new data
                    let tmpCnt = Object.assign({},cnt)
                    let tmpGroupID = Array.from(cnt.groupID);
                    let tmpGroupPos = Object.assign({},cnt.groupPos);
                    tmpGroupID.push(newKey);
                    tmpGroupPos[newKey] = {x:0,y:0,w:1,h:1};

                    tmpCnt.groupID = tmpGroupID;
                    tmpCnt.groupPos = tmpGroupPos;

                    store.dispatch('setElement',{ // push new data
                        type:'container',
                        id:CntID,
                        val:tmpCnt
                    }).then(a=>{
                        resolve(newKey); // resolve with newKey
                    })
                })
            })
        })

    })

}

const CreateNewSection = function (GrpID, SecData){
    let elFac = new ElementsFactory();
    let newSection = SecData;


    if(SecData === undefined) {
        newSection = elFac.createSection({
            type: 'text',
            itemID: [],
            meta: elFac.createMeta({
                title: 'New',
                description: 'New',
                tags: ['Section']
            })
        })
    }

    return new Promise((resolve, reject) => {

        store.dispatch('getNewID',{type:'section'}).then(newKey => { // get new section id

            store.dispatch('setElement',{ // add new group to DB
                type:'section',
                id:newKey,
                val:newSection
            }).then(a=>{ // update group with new group ID and pos
                // console.log(a)
                store.dispatch('getElementByKey',{ // get the latest container data to update it
                    type:'group',
                    id:GrpID,
                    key:'sectionID'
                }).then(sectionID=>{ // update container with new data

                    let tmpSectionID = [];

                    if(sectionID === undefined) tmpSectionID.push(newKey);
                    else{
                        tmpSectionID = Array.from(sectionID);
                        tmpSectionID.push(newKey)
                    }


                    store.dispatch('setElementByKey',{ // push new data
                        type:'group',
                        id:GrpID,
                        val:tmpSectionID,
                        key:'sectionID'
                    }).then(a=>{
                        resolve(newKey); // resolve with new elements Key
                    })
                })
            })
        })

    })
}


const CreateNewItem = function (SecID,ItemData){
    let elFac = new ElementsFactory();
    let newItem = ItemData;

    if(ItemData === undefined) {
        newItem = elFac.createItem({
            type: 'text',
            content: 'new',
            meta: elFac.createMeta({
                title: 'New',
                description: 'New',
                tags: ['Item']
            })
        })
    }


    return new Promise((resolve, reject) => {

        store.dispatch('getNewID',{type:'item'}).then(newKey => { // get new section id

            store.dispatch('setElement',{ // add new group to DB
                type:'item',
                id:newKey,
                val:newItem
            }).then(a=>{ // update group with new group ID and pos
                // console.log(a)
                store.dispatch('getElementByKey',{ // get the latest container data to update it
                    type:'section',
                    id:SecID,
                    key:'itemID'
                }).then(itemID=>{ // update container with new data
                    // console.log(sectionID)

                    let tmpItemID = [];

                    if(itemID === undefined) tmpItemID.push(newKey);
                    else{
                        tmpItemID = Array.from(itemID);
                        tmpItemID.push(newKey)
                    }

                    store.dispatch('setElementByKey',{ // push new data
                        type:'section',
                        id:SecID,
                        val:tmpItemID,
                        key:'itemID'
                    }).then(a=>{
                        // console.log(a)
                        resolve(newKey); // resolve with newKey
                    })
                })
            })
        })

    })
};


export {
    CreateNewContainer,
    CreateNewDashboard,
    CreateNewGroup,
    CreateNewSection,
    CreateNewStuffspace,
    CreateNewItem
}