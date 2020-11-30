<template>
  <div
      :id="gridData.gridID"
      :class="this.gridData.gridClass"
      @mousemove="this.mouseMove($event)"
      @mouseup="onMouseReleaseDrag()"
      :style="{
        gridTemplateRows: makeGridByRepeat(this.gridData.gridRowNum),
        gridTemplateColumns: makeGridByRepeat(this.gridData.gridColNum),
      }"
  >
    <Container
        v-for="(container,keyContainer) in containers"
        :id="this.wrapId([keyContainer])"
        :key="keyContainer"
        :style="{
        gridColumnStart: container.pos.x,
        gridColumnEnd: container.pos.x + container.pos.w ,
        gridRowStart: container.pos.y,
        gridRowEnd: container.pos.y + container.pos.h ,
      }"
        :groupGridRowCount="container.innerGrid.rows"
        :groupGridColCount="container.innerGrid.cols"
    >
      <template v-slot:ContainerHeader>
        <div class="dashboardContainerHeader">
          <Drag class="dashboardHoverMenu" :id="this.makeDragId([keyContainer])" @mousedown="onContainerMouseDown($event)"  ></Drag>
          <p class="dashboardContainerTitle">Container {{keyContainer}}</p>
          <!--          // TODO dashboardTitle component-->
          <ContainerMenu class="dashboardHoverMenu" ></ContainerMenu>
        </div>
      </template>

      <template v-slot:ContainerGroups>
        <Group
            v-for="(group,keyGroup) in this.getGroups(container)"
            :id="wrapId([keyContainer,keyGroup])"
            :group="group"
            :key="keyGroup"
            :style="{
              gridColumnStart: container.groupPos[keyGroup].x,
              gridColumnEnd: container.groupPos[keyGroup].x + container.groupPos[keyGroup].w ,
              gridRowStart: container.groupPos[keyGroup].y,
              gridRowEnd: container.groupPos[keyGroup].y + container.groupPos[keyGroup].h ,
            }"
        >

          <template v-slot:GroupHeader>
            <div class="dashboardGroupHeader">
              <Drag class="dashboardHoverMenu" :id="this.makeDragId([keyContainer,keyGroup])" @mousedown="onGroupMouseDown($event)"  ></Drag>
              <p class="dashboardGroupTitle">Group {{keyGroup}}</p>
              <GroupMenu class="dashboardHoverMenu"></GroupMenu>
            </div>
          </template>

          <template v-slot:GroupItems>
            <Item v-for="item in this.getItems(group)"
                           :class="makeItemClassByType(item.item.type)"
                           :id="wrapId([keyContainer,keyGroup,item.ID])"
                           :ID="item.ID"
                           :item="item.item"
                           :key="item.ID"
            ></Item>
            <!--    Task palceholder maybe later        -->
            <!--            <div :id="makePlaceholderId([keyContainer,keyGroup])" class="groupPlaceholder"> <p> Hi, I'm a placeholder for {{keyGroup}}</p></div>-->
          </template>

        </Group>
        <div
            :id="makePlaceholderId([keyContainer])"
            class="containerPlaceholder"
            :style="{
              gridColumnStart:  container.groupPlaceholderPos.x,
              gridColumnEnd: container.groupPlaceholderPos.x + container.groupPlaceholderPos.w ,
              gridRowStart: container.groupPlaceholderPos.y,
              gridRowEnd: container.groupPlaceholderPos.y + container.groupPlaceholderPos.h ,
            }"
        > <p> Hi, I'm a placeholder for {{keyContainer}}</p></div>
      </template>
    </Container>
    <!--    <p>Hello</p>-->
    <div
        :id="makePlaceholderId([this.gridData.gridID])"
        class="dashboardPlaceholder"
        :style="{
              gridColumnStart: tmpContainerData.placeholderPos.x,
              gridColumnEnd: tmpContainerData.placeholderPos.x + tmpContainerData.placeholderPos.w ,
              gridRowStart: tmpContainerData.placeholderPos.y,
              gridRowEnd: tmpContainerData.placeholderPos.y + tmpContainerData.placeholderPos.h ,
            }"
    > <p> Hi, I'm a placeholder for dashboard</p></div>
  </div>
</template>

<script>

import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardGroup from "@/components/dashboard/DashboardGroup";
import DashboardTask from "@/components/dashboard/DashboardTask";
import DashboardDrag from "@/components/dashboard/DashboardDrag";
import DashboardContainerMenu from "@/components/dashboard/DashboardMenus/DashboardContainerMenu";
import DashboardGroupMenu from "@/components/dashboard/DashboardMenus/DashboardGroupMenu";
import DashboardTaskMenu from "@/components/dashboard/DashboardMenus/DashboardTaskMenu"; // on right click open menu
import Container from "@/components/grid/GridBaseElements/Container";
import Drag from "@/components/grid/GridBaseElements/Drag";
import ContainerMenu from "@/components/grid/GridBaseElements/ContainerMenu";
import Group from "@/components/grid/GridBaseElements/Group";
import Item from "@/components/grid/GridBaseElements/Item";
import GroupMenu from "@/components/grid/GridBaseElements/GroupMenu"; // on right click open menu

export default {
  name: "Dashboard",
  components:{
    DashboardContainerMenu, Container, Group, GroupMenu,Item,Drag,ContainerMenu,
    DashboardGroupMenu, DashboardTask, DashboardContainer, DashboardGroup, DashboardDrag },
  props: {
    items: {
      type: Object
    },
    groups: {
      type: Object
    },
    containers: {
      type: Object
    },
    gridData: {
      type: Object
    }
  },
  data(){
    return{
      dashboardData:{ // podaci o glavnom gridu, dashbordu
        dashboardId:'dash-01',
        dashboardClass: 'dashboard',
        dashboardTarget:'', //== document.getElemetById(dashboardData.dashboardId)
        grid:{top:0,left:0,width:0,height:0,x:0,y:0}, // not used
        gridColNum:5,
        gridRowNum:4,
      },
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
      tmpGroupData:{
      },
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

        let isCopyOfGroupAlreadyInContainer = this.containers[firstHoveredContainerKey].groups.includes(this.mouseData.groupKey);
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
    /*  areRectanglesCollidedWithRectangle
    ** ----------------------------------
    **  dictA == { '<rect key>':{x:*, y:*, w:*, h:*},...}
    **  dictA[for key In Dict] used to access {x:*, y:*, w:*, h:*}
    **
    ** posB = {x:*, y:*, w:*, h:*}
    **
    ** listOfAllowedDictAKey is an array of rect keys that are allowed to collide
    */
    areRectanglesCollidedWithRectangle(dictA,posB,listOfAllowedDictAKey){
      let collidedKeys = [];
      let isCollided = false;
      for(const keyA in dictA){
        if(!listOfAllowedDictAKey.includes(keyA)){ // check if key is allowed to collide
          if(this.isRectangleACollidedWithRectangleB(posB, dictA[keyA])){
            collidedKeys.push(keyA);
            isCollided = true;
          }
        }
      }
      // console.log(isCollided)
      return { isCollided: isCollided, collidedKeys:collidedKeys };
    },
    /*  isRectangleACollidedWithRectangleB
    **  check if rectA is inside rectB
    ** ----------------------------------
    **  pos* = {x:*, y:*, w:*, h:*}
    *
    */
    isRectangleACollidedWithRectangleB(posA,posB){
      if( (posA.x+posA.w -1) >= posB.x &&
          posA.x <= (posB.x + posB.w -1) &&
          (posA.y+posA.h -1) >= posB.y &&
          posA.y <= (posB.y + posB.h -1)
      ) return true;
      return false;
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
      let groupList = container.groups;
      let res = {}, key;
      for( key in this.groups) if(groupList.includes(key)) res[key] = this.groups[key];
      return res;
    },
    getItems(group){ // join all the tasks of a group in an array
      let itemList = group.items;
      let res = [], key;
      for( key of itemList) res.push({ID:key,item:this.items[key]})
      return res;
    },
    /////////////////////////////////////////////////////////////////////////////////////////////
    ////  ID FACTORY
    /*  id prefix :

        Container :   <container key>+
        Group :       <container key>+<group key>+
        Item :        <container key>+<group key>+<item key>+
        ----------------------------------------------------------------------------------------------------
        |              |   container                    ||        group                                    |
        ----------------------------------------------------------------------------------------------------
        | Drag         |   drag+<container key>+         ||     drag+<container key>+<group key>+          |
        | Placeholder  |   placeholder+<container key>+  ||     placeholder+<container key>+<group key>+   |
        ----------------------------------------------------------------------------------------------------
        za pronaci parent id samo se treba id.split('+') itd...
     */
    makeDragId(lst){
      return 'drag'+'+'+ this.wrapId(lst);
    },
    makePlaceholderId(lst){
      return 'placeholder' + '+' + this.wrapId(lst);
    },
    wrapId(lst){ // make id from a list
      let res = '', e;
      for(e of lst){
        res += e + '+';
      }
      return res
    },
    unwrapId(id){ // splits the id
      return id.split('+');
    },
    makeItemClassByType(tskType){ // TODO, used later
      return 'dashboardTask'+'-'+tskType;
    },
    /////////////////////////////////////////////////////////////////////////////////////////////
    calculateContainerSize(){ // before mount calculate the best size for container to fit all the groups, calc based on max group element w+x, h+y
      for(const cntKey in this.containers){
        let maxX=0,maxY=0;
        for(const cntGrpKey in this.containers[cntKey].groupPos){
          maxX = Math.max(
              (this.containers[cntKey].groupPos[cntGrpKey].w + this.containers[cntKey].groupPos[cntGrpKey].x - 1),
              maxX);
          maxY = Math.max(
              (this.containers[cntKey].groupPos[cntGrpKey].h + this.containers[cntKey].groupPos[cntGrpKey].y - 1),
              maxY );
        }
        this.containers[cntKey].pos.w = maxX;
        this.containers[cntKey].pos.h = maxY;
      }

    },
    calculateGroupSize(){ // before mount calculate the best size for group,

    },
    calculateContainerPos(){ //not used yet, it should calculate the container position making the dashboard more responsive

    },
    calculateGroupPos(){ //not used yet, same as above

    },

  },
  mounted() {
    this.gridData.dashboardTarget = document.getElementById(this.gridData.gridID);
    this.gridData.grid = this.gridData.dashboardTarget.getBoundingClientRect();
    // // TESTING
    // setInterval( ()=>{
    //   this.containers['cnt-1'].pos.y = 4;
    //   // this.groups['grp-5'].tasks.push('tsk-1')
    // },3000)
  },
  created() {
    // this.calculateContainerSize();
  }
}
</script>

<style lang="scss" scoped>


.dashboard {
  display: grid;

  background-color: cornsilk;
  grid-gap: 10px;
  width: 100vw;
  height: 100vh;
  padding: 20px;

  overflow: hidden;

  .dashboardPlaceholder{
    background-color: green;
    color: black;
    display: none;
  }

  .containerPlaceholder{
    background-color: green;
    color: black;
    display: none;
  }

  .dashboardContainerHeader{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    //justify-content: center;
    &:hover{
      .dashboardHoverMenu{
        visibility: initial;
      }
    }
    .dashboardHoverMenu{
      visibility: hidden;
    }
    .dashboardContainerTitle{
      color: cornsilk;
    }
  }

  .dashboardGroupHeader{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    //justify-content: center;
    &:hover{
      .dashboardHoverMenu{
        visibility: initial;
      }
    }
    .dashboardHoverMenu{
      visibility: hidden;
    }
    .dashboardGroupTitle{
      color: cornsilk;
    }
  }

}

</style>


<!--
///////////////////////////////////////////////////////////////////////////////////////////////////
///                             GRID SANITY CHECK                                               ///
///////////////////////////////////////////////////////////////////////////////////////////////////

ROW (y)|COl (x)
      -→
 |   0----------0----------0----------0----------0----------0
 ↓   |          |
     |    1x1y  |
     |          |
     |          |
     0----------0----------0----------0----------0----------0
     |          |
     |   1x2y   |
     |          |
     |          |
     0----------0----------0----------0----------0----------0
     |          |          |
     |          |          |
     |          |          |
     |          |          |
     0----------0----------0----------0----------0----------0

-->


















