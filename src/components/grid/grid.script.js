
import Container from "@/components/grid/GridBaseElements/Container/Container";
import ContainerMenu from "@/components/grid/GridBaseElements/Container/ContainerMenu";
import Group from "@/components/grid/GridBaseElements/Group/Group";
import GroupMenu from "@/components/grid/GridBaseElements/Group/GroupMenu"; // on right click open menu
import Package from "@/components/grid/GridBaseElements/Package/Package";
import PackageMenu from "@/components/grid/GridBaseElements/Package/PackageMenu";
import Drag from "@/components/grid/GridBaseElements/Common/Drag";

import Button from "@/components/common/Button";

import {makePlaceholderId,makeDragId,wrapId,unwrapId } from "@/components/grid/gridID.factory";
import {isRectangleACollidedWithRectangleB,areRectanglesCollidedWithRectangle} from "@/components/grid/gridCollision.module";

import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    name: "Grid",
    components:{
        Container, Group, GroupMenu,Package,Drag,ContainerMenu,PackageMenu,Button},
    props: {
        // content: {
        //     type: Object
        // },
        // groups: {
        //     type: Object
        // },
        // containers: {
        //     type: Object
        // },
        // gridData: {
        //     type: Object
        // },
        type:{
            type:String
        },
        // ID:{
        //     type:Number
        // }
    },
    data(){
        return{
            gridData: {},
            containers:{},
            groups:{},
            content: {},

            ID:0,
            gridClass:'asd',

            mouseData:{
                hasClicked:false, // was there a click?
                dragId:'',  // id of drag element
                type:'', // group || container
                containerId:'', // <--┐
                groupId:'',  // same but different
                containerKey:'',  // ID is for HTML, key is for JS
                groupKey:'',  // ^^
                mouseUpTarget: '', // == document.getElemetById(mouseData.containerId || -||-.groupId)
                mouseDownTarget: '', // not used
                canBeDropped: false, // should mouseUp move container/group
                prevHoveredOverGroupPlaceholderElement: '',
                prevHoveredOverContainerKey: '',
            },
            tmpContainerData:{
                tmpContainerPos : {},
                placeholderPos : {w:1,h:1,x:1,y:1}, // position of container placeholder
            },

            makePlaceholderId:makePlaceholderId,
            makeDragId:makeDragId,
            wrapId:wrapId,
            unwrapId:unwrapId,

            isRectangleACollidedWithRectangleB:isRectangleACollidedWithRectangleB,
            areRectanglesCollidedWithRectangle:areRectanglesCollidedWithRectangle,
        }
    },
    methods:{
        // refreshTmpContainerPosDic() creates an array of container pos, easier to do areRectanglesCollidedWithRectangle() with just a list/dict
        refreshTmpContainerPosDic(){
            this.tmpContainerData.tmpContainerPos = {};
            for(const cnt in this.containers){
                this.tmpContainerData.tmpContainerPos[cnt] = this.containers[cnt].pos;
            }
        },

        makeGridByRepeat(num){ // used instead of repeat(6,1fr)
            let str = '';
            for(let i = 0; i< num; i++) str += '1fr ';
            return str;
        },

        /* onGroupMouseDown and onContainerMouseDown are mostly the same
        **
        */
        onGroupMouseDown(event){
            this.mouseData.hasClicked = true; //
            this.mouseData.dragId = event.target.id;
            this.mouseData.type = 'group';

            this.mouseData.groupId = this.mouseData.dragId.substring(5,this.mouseData.dragId.length); //groupId is : <containerKey>+<groupKey>+
            let tmpKeyAr = this.unwrapId(this.mouseData.groupId);
            this.mouseData.containerKey = tmpKeyAr[0];
            this.mouseData.groupKey = tmpKeyAr[1];

            let groupPlaceholderElement = document.getElementById(this.makePlaceholderId([this.mouseData.containerKey]));
            this.mouseData.prevHoveredOverGroupPlaceholderElement = groupPlaceholderElement; // just need a single prevPlaceholder so it doesnt throw error

            this.containers[this.mouseData.containerKey].groupPlaceholderPos.w = this.containers[this.mouseData.containerKey].groupPos[this.mouseData.groupKey].w;
            this.containers[this.mouseData.containerKey].groupPlaceholderPos.h = this.containers[this.mouseData.containerKey].groupPos[this.mouseData.groupKey].h;


            this.mouseData.mouseDownTarget = document.getElementById(this.mouseData.groupId);
            this.mouseData.mouseDownTarget.style.position = 'absolute';
        },

        onContainerMouseDown(event){
            this.mouseData.hasClicked = true; // "unlocks" the mouseMove function
            this.mouseData.dragId = event.target.id; // save id of clicked drag element so we can get the id of the container
            this.mouseData.type = 'container'; // used in mouseMove to know the type
            this.mouseData.containerId = this.mouseData.dragId.substring(5,this.mouseData.dragId.length); // drag elements id : drag+
            // console.log(this.mouseData.containerId)
            this.mouseData.mouseDownTarget = document.getElementById(this.mouseData.containerId);
            this.mouseData.mouseDownTarget.style.position = 'absolute'; // 'unlock' the container so it can be moved
            this.mouseData.containerKey = this.unwrapId(this.mouseData.containerId)[0];
            this.refreshTmpContainerPosDic(); // used for collision detection
            this.tmpContainerData.placeholderPos.w = this.containers[this.mouseData.containerKey].pos.w; // set placeholder w and h to be the same as current dragged elem.
            this.tmpContainerData.placeholderPos.h = this.containers[this.mouseData.containerKey].pos.h;
        },

        mouseMove(event){
            if(!this.mouseData.hasClicked) return;

            let posX = (event.clientX - this.gridData.grid.left);
            let posY = (event.clientY - this.gridData.grid.top);

            this.mouseData.mouseDownTarget.style.left = (posX + 10) + 'px'; // make container follow the cursor
            this.mouseData.mouseDownTarget.style.top = (posY + 10) + 'px';  // adds 10px bcz if not then cursor is always above the dragged element

            if(this.mouseData.type == 'container'){  // if the user is dragging a container element,
                let gridSector = { // smoothing to get better grid snapping while mouseOver, grid sector of cursor
                    // % of grid mouse is in          *          num of Rows/Cols       +1 bcz grid starts from 1
                    x: Math.floor((posX/this.gridData.grid.width) * this.gridData.gridColNum) + 1, // FIXME nes sam zeznuo, prob pobrkao col/row negdje jer radi ok a nebi trebalo
                    y: Math.floor((posY/this.gridData.grid.height) * this.gridData.gridRowNum) + 1
                }
                let currentContainerPos = { // w and h are the same but the x and y are mouse cursor gridSector values
                    x: gridSector.x,
                    y: gridSector.y,
                    w: this.containers[this.mouseData.containerKey].pos.w,
                    h: this.containers[this.mouseData.containerKey].pos.h,
                }

                let isCollision = this.areRectanglesCollidedWithRectangle(this.tmpContainerData.tmpContainerPos,currentContainerPos,[this.mouseData.containerKey])
                let placeholderId = this.makePlaceholderId([this.gridData.gridID]);
                let placeholder = document.getElementById(placeholderId);
                placeholder.style.display = "initial"; // TODO move display style to mouseDown, needs to be updated only once

                this.tmpContainerData.placeholderPos.x = gridSector.x; // move placeholder
                this.tmpContainerData.placeholderPos.y = gridSector.y;

                if(isCollision.isCollided){
                    placeholder.style.backgroundColor = "red";
                    this.mouseData.canBeDropped = false;
                }
                else{
                    placeholder.style.backgroundColor = 'green';
                    this.mouseData.canBeDropped = true;
                }
            }
            else if(this.mouseData.type == 'group'){  // if the user is dragging a group element,
                let hoveredOverElement = event.target;
                // console.log(hoveredOverElement)                                         // DONJI class name treba biti isti kao glavna klasa kontejnera
                let firstHoveredContainer = this.firstParentWithTargetClass(hoveredOverElement,'container',this.gridData.gridClass) // CLASS OF Container element
                if(firstHoveredContainer === null){
                    this.mouseData.prevHoveredOverGroupPlaceholderElement.style.display = 'none';
                    return;
                }

                let firstHoveredContainerKey = this.unwrapId(firstHoveredContainer.id)[0];
                let containerSize = firstHoveredContainer.getBoundingClientRect(); // to ccalculate relative mouse pos and sectors inside the container
                this.mouseData.prevHoveredOverContainerKey = firstHoveredContainerKey;

                // mouse pos relative to inside the container
                let cntPosX = (event.clientX - containerSize.left);
                let cntPosY = (event.clientY - containerSize.top);

                let gridSector = { // smoothing to get better grid snapping while mouseOver, grid sector of cursor
                    // % of grid mouse is in          *          num of Rows/Cols       +1 bcz grid starts from 1
                    x: Math.floor((cntPosX/containerSize.width) * this.containers[firstHoveredContainerKey].innerGrid.cols) + 1,
                    y: Math.floor((cntPosY/containerSize.height) * this.containers[firstHoveredContainerKey].innerGrid.rows) + 1
                }

                let isInsideInnerGrid =
                    ( (gridSector.x) <= this.containers[firstHoveredContainerKey].innerGrid.rows) &&
                    ( (gridSector.y) <= this.containers[firstHoveredContainerKey].innerGrid.cols);

                // if(!isInsideInnerGrid) return;

                let currentContainerPos = { // w and h are the same but the x and y are mouse cursor gridSector values
                    x: gridSector.x,
                    y: gridSector.y,
                    w: this.containers[this.mouseData.containerKey].groupPos[this.mouseData.groupKey].w, //w and h of the dragged group eleemnt
                    h: this.containers[this.mouseData.containerKey].groupPos[this.mouseData.groupKey].h,
                }

                // console.table(gridSector);
                // console.log("Hovered OVER TARGET : ",firstHoveredContainerKey)

                let isCollision = this.areRectanglesCollidedWithRectangle(this.containers[firstHoveredContainerKey].groupPos,currentContainerPos,[this.mouseData.groupKey])

                let groupPlaceholderId = this.makePlaceholderId([firstHoveredContainerKey]);
                let groupPlaceholderElement = document.getElementById(groupPlaceholderId);
                if(this.mouseData.prevHoveredOverGroupPlaceholderElement != groupPlaceholderElement){
                    this.mouseData.prevHoveredOverGroupPlaceholderElement.style.display = 'none';
                    this.mouseData.prevHoveredOverGroupPlaceholderElement = groupPlaceholderElement;
                }

                this.containers[firstHoveredContainerKey].groupPlaceholderPos.x = gridSector.x;
                this.containers[firstHoveredContainerKey].groupPlaceholderPos.y = gridSector.y;

                let isCopyOfGroupAlreadyInContainer = this.containers[firstHoveredContainerKey].groupID.includes(this.mouseData.groupKey);
                let isCopyComingFromDifferentContainer = this.mouseData.containerKey != firstHoveredContainerKey;

                // console.log(this.containers[firstHoveredContainerKey].groups);
                // console.log(isCopyOfGroupAlreadyInContainer)
                // console.log(isCopyOfGroupAlreadyInContainer, isCopyComingFromDifferentContainer)

                if(isCollision.isCollided || (isCopyOfGroupAlreadyInContainer && isCopyComingFromDifferentContainer)){
                    groupPlaceholderElement.style.backgroundColor = "red";
                    this.mouseData.canBeDropped = false;
                }
                else{
                    groupPlaceholderElement.style.backgroundColor = "green";
                    this.mouseData.canBeDropped = true;
                }
                groupPlaceholderElement.style.display = 'initial'; //FIXME

            }
        },

        onMouseReleaseDrag(){ // should have called it onMouseReleaseDrag
            if(!this.mouseData.hasClicked) return;
            this.mouseData.hasClicked = false;

            if(this.mouseData.type == 'container'){
                if(this.mouseData.canBeDropped){
                    this.containers[this.mouseData.containerKey].pos.x = this.tmpContainerData.placeholderPos.x;
                    this.containers[this.mouseData.containerKey].pos.y = this.tmpContainerData.placeholderPos.y;
                }
                let placeholder = document.getElementById(this.makePlaceholderId([this.gridData.gridID]));
                placeholder.style.display = "none"; // TODO move display style to mouseDown
            }

            else if(this.mouseData.type == 'group' ){
                if(this.mouseData.canBeDropped){
                    const cntB = this.mouseData.prevHoveredOverContainerKey;

                    if(cntB == this.mouseData.containerKey){
                        this.moveGroupInsideSameContainer(
                            this.mouseData.groupKey,
                            this.containers[cntB].groupPlaceholderPos,
                            this.mouseData.containerKey,
                        );
                    }
                    else{
                        this.moveGroupFromACntToBCnt(
                            this.mouseData.groupKey,
                            this.containers[cntB].groupPlaceholderPos,
                            this.mouseData.containerKey,
                            cntB
                        )
                    }
                }
                this.mouseData.prevHoveredOverGroupPlaceholderElement.style.display = 'none';
            }

            this.mouseData.mouseDownTarget.style.position = 'static';
            this.mouseData.canBeDropped = false;
        },

        // goes up the tree until it finds the first el with targetClass(returns that el) or failConditionClass(returns null)
        firstParentWithTargetClass(el,targetClass,failConditionClass){ // FIXME ponekad baci Uncaught TypeError: el.classList is undefined,,, neznam iznad cega je kada to baci
            if(el.classList.contains(targetClass)) return el; // tu ga baci TODO baci error kad je mis iznad elem kojeg vuce !!!!
            else if(el.classList.contains(failConditionClass)) return null;
            else return this.firstParentWithTargetClass(el.parentElement,targetClass,failConditionClass);
        },
        moveGroupInsideSameContainer(groupKey,groupPos,cntKey){
            this.containers[cntKey].groupPos[groupKey] = {... groupPos}; //FIXME delete the prev dict or just overwrite
        },
        moveGroupFromACntToBCnt(groupKey,groupPos,cntAKey,cntBKey){
            this.containers[cntBKey].groups.push(groupKey);
            this.containers[cntBKey].groupPos[groupKey] = {... groupPos};
            delete this.containers[cntAKey].groupPos[groupKey];
            delete this.containers[cntAKey].groups[this.containers[cntAKey].groups.indexOf(groupKey)];
            console.log(this.containers)
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////
        getGroups(container) { // join all the groups of a container in an array
            let groupList = container.groupID;
            let res = {}, key;
            for( key in groupList) if(this.groups[key]) res[key] = this.groups[key];
            // console.log(res,this.groups,container.groupID)
            return res;
        },

        createGridArea(groupPos){
            let gridColumnStart= groupPos.x ;
            let gridColumnEnd= groupPos.x + groupPos.w ;
            let gridRowStart= groupPos.y  ;
            let gridRowEnd= groupPos.y + groupPos.h ;

            let grdAr = `${gridRowStart} / ${gridColumnStart} / ${gridRowEnd} / ${gridColumnEnd}`

            console.log(grdAr)

            return {
                gridArea:grdAr
            }
        },

        addGrid(){
            this.$store.dispatch('logOut');

            this.containers['cnt-5'] = {
                title:'Container 1',
                groups:['grp-1'],
                pos:{w:1,h:1,x:2,y:3},
                innerGrid:{rows: 1,cols: 1},
                groupPlaceholderPos:{w:1,h:1,x:1,y:1},
                groupPos:{
                    'grp-1':{w:1,h:1,x:1,y:1},
                }}
        },

        loadData(){

            // console.log(this.ID)

            // get dash
            this.$store.dispatch('getElement',{
                type:'dashboard',
                id:this.ID
            }).then(dash=> {

                //grid setup
                this.gridData = dash.gridData
                this.gridData.dashboardTarget = document.getElementById(this.ID);
                this.gridData.grid = this.gridData.dashboardTarget.getBoundingClientRect();

                // get containers
                this.$store.dispatch('getElements',{
                    type:'container',
                    id:dash.containerID
                }).then(cnt=> {
                    console.log(cnt)

                    this.containers = cnt;
                    // this.groups={
                    //     'grp-1':{title:'Group 1',attributes:{completed:false,locked:false,title:false,},items:['tsk-1'],},
                    //     'grp-2':{title:'Group 2',attributes:{completed:false,locked:false,title:true,},items:['tsk-4'],},
                    //     'grp-3':{title:'Group 3',attributes:{completed:false,locked:false,title:true,},items:['tsk-3'],},
                    //     'grp-4':{title:'Group 4',attributes:{completed:false,locked:false,title:true,},items:['tsk-5'],},
                    //     'grp-5':{title:'Group 5',attributes:{completed:false,locked:false,title:true,},items:['tsk-6'],},
                    // }
                    //
                    // this.containers={
                    //     'cnt-1':{
                    //         title:'Container 1',
                    //         groups:['grp-1'],
                    //         pos:{w:1,h:1,x:4,y:3},
                    //         innerGrid:{rows: 1,cols: 1},
                    //         groupPlaceholderPos:{w:1,h:1,x:1,y:1},
                    //         groupPos:{
                    //             'grp-1':{w:1,h:1,x:1,y:1},
                    //         }},
                    //     'cnt-2':{
                    //         title:'Container 1',
                    //         groups:['grp-2'],
                    //         pos:{w:1,h:1,x:1,y:3},
                    //         innerGrid:{rows: 1,cols: 1},
                    //         groupPlaceholderPos:{w:1,h:1,x:1,y:1},
                    //         groupPos:{
                    //             'grp-2':{w:1,h:1,x:1,y:1},
                    //         }},
                    //     'cnt-3':{
                    //         title:'Container 1',
                    //         groups:['grp-4'],
                    //         pos:{w:1,h:1,x:1,y:1},
                    //         innerGrid:{rows: 1,cols: 1},
                    //         groupPlaceholderPos:{w:1,h:1,x:1,y:1},
                    //         groupPos:{
                    //             'grp-4':{w:1,h:1,x:1,y:1},
                    //         }},
                    //     'cnt-4':{
                    //         title:'Container 1',
                    //         groups:['grp-5','grp-2','grp-1'],
                    //         pos:{w:2,h:1,x:3,y:1},
                    //         innerGrid:{rows: 3,cols: 1},
                    //         groupPlaceholderPos:{w:1,h:1,x:1,y:1},
                    //         groupPos:{
                    //             'grp-2':{w:2,h:1,x:1,y:1},
                    //             'grp-5':{w:1,h:1,x:1,y:2},
                    //             'grp-1':{w:1,h:1,x:1,y:3},
                    //         }},
                    // }




                    this.$store.dispatch('getElements',{
                        type:'group',
                        id:cnt[0].groupID
                    }).then(grp=> {
                            this.groups = grp;
                            console.log(grp)
                        }
                    )
                })
            })
        },

        ...mapActions([
            'setElement'
        ])
    },
    computed:{

        ...mapGetters([
            'isDbReady',
            'getDash',
            'getCnt',
            'getGroup',
            'getSec',
            'getItem',

        ])
    },
    watch:{
        // ako korisnik refresha stranicu mora se svaki put provjeriti dali je jos uvijek baza spremna te se tek onda grid popunjava s podacima
        isDbReady(newState,oldState) { // TODO ELSE loading
            // console.log('DB state change, new :',newState)
            if(newState){
                // this.setElement({
                //     type:'group',
                //     id:8,
                //     val:a[0]
                // })
                this.loadData();
            }
        },
        getGroup(newS,oldS){
            console.log(newS)
        }

    },
    beforeMount() {

        this.ID=this.$route.query.id;
        if(this.isDbReady) this.loadData(); //ako je vec baza spremna ucitaj podatke


        // this.gridData={ // podaci o glavnom gridu, dashbordu
        //     gridID:'dash-01',
        //         gridClass: 'dashboard',
        //         dashboardTarget:'', //== document.getElemetById(GridData.gridID)
        //         grid:{top:0,left:0,width:0,height:0,x:0,y:0}, // not used
        //     gridColNum:6,
        //         gridRowNum:6,
        // }
        // console.log(this.ID)
        // console.log('is db Ready : ', this.$store.getters.isDbReady)


        // this.gridClass='test';

        // setTimeout(()=>{
        //     this.gridClass='dashboard';
        //     this.gridData.gridColNum=7;
        //     console.log(this.gridData.gridClass);
        //     this.$forceUpdate()
        // },3000)



    },
}