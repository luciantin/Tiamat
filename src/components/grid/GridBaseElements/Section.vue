<template>
  <div v-if="sectionID >= 0" class="section" :id="wrapId([containerID,groupID,sectionID])" :index="index">
    <div class="left">

    </div>

    <div class="mid">

      <div class="Header">
        <div class="actionIcon dragIcon" :id="makeDragId([containerID,groupID,sectionID])"  @mousedown="onDragDown" @mouseup="onDragUp">
          <img class="img" src="@/assets/img/GridMenu/DragElem.svg"/>
        </div>
        <p>{{groupID}} || {{sectionID}}</p>
      </div>
      <div class="Content">
        <ItemFactory
            v-if="showSectionItems"
            v-for="(item,index) in localSectionItemID"
            :itemID="item"
            :sectionID="sectionID"
            :groupID="groupID"
            :gridType="gridType"
            :containerID="containerID"
        />
      </div>
      <div class="Footer">

      </div>

    </div>

    <div class="right">
      <div v-if="!showAddMenu">
        <div  class="actionIcon" @click="onEditSection">
          <img class="img "  src="@/assets/img/GridMenu/Edit.svg"/>
        </div>
        <div  class="actionIcon" @click="onAddNewItem">
          <img class="img "  src="@/assets/img/GridMenu/Add.svg"/>
        </div>
        <div  class="actionIcon" @click="onDeleteSection">
          <img class="img" src="@/assets/img/GridMenu/Delete.svg"/>
        </div>
      </div>
      <div v-else @mouseleave="onMouseLeaveAddMenu">
        <Tooltip v-for="(item,index) in sectionAddMenuItems" :key="index">
          <template v-slot:content>
            <div  class="actionIcon" @click="onSectionAddMenuClick(item,index)">
              <img class="img" :src="item.src"/>
            </div>
          </template>
          <template v-slot:tooltip>
            <p>{{item.tip}}</p>
          </template>
        </Tooltip>


      </div>
    </div>
  </div>

  <div v-else>
    <div class="sectionPlaceholder" :id="makePlaceholderId([containerID,groupID])">Placeholder</div>
  </div>

  <Teleport v-if="showEdit" :to="`#${modalID}`" >
    <div v-click-outside="onClickOutsideOfModal" >
      <h2>Twegwegwesd wrge wgrgw rg er</h2>
      <KrakenEditor
        :itemID="localSectionItemID"
        :sectionID="sectionID"
        @loadData="onKrakenEditorLoadData"
      />
    </div>
  </Teleport>

</template>

<script>
import {DeleteSection} from "@/components/grid/ElementHelpers/elementDelete";
import ItemFactory from "@/components/grid/Factory/ItemFactory";
import {CreateNewItem} from "@/components/grid/ElementHelpers/elementCreate";
import {makeDragId,wrapId,makePlaceholderId} from "@/components/grid/gridID.factory";
import KrakenEditor from "@/components/grid/GridBaseElements/Common/KrakenEditor";
import IconTooltip from "@/components/common/IconTooltip";
import Tooltip from "@/components/common/Tooltip";

export default {
  name: "Section",
  components: {Tooltip, IconTooltip, KrakenEditor, ItemFactory},
  props:{
    sectionID:String,
    groupID:String,
    containerID:String,
    gridType:String,
    index:Number,
    showSectionItems:Boolean,
    modalID:String,
  },
  emits:['loadData','onSectionDragDown','onSectionDragUp','showModal'],
  data(){
    return{
      localSectionItemID : null,
      localSectionMeta : null,
      localSectionType : null,
      makeDragId:makeDragId,
      wrapId:wrapId,
      makePlaceholderId:makePlaceholderId,
      showEdit:false,
      showModal:false,
      modalClickDebounce:false,
      showAddMenu:false,
      sectionAddMenuItems:[
        {type:'text',tip:'Add Text',src:require('@/assets/img/GridMenu/Add.svg')},
        {type:'list',tip:'Add List',src:require('@/assets/img/GridMenu/List.svg')},
        {type:'image',tip:'Add Image',src:require('@/assets/img/GridMenu/Image.svg')},
        {type:'link',tip:'Add Link',src:require('@/assets/img/GridMenu/Info.svg')},
        {type:'table',tip:'Add Table',src:require('@/assets/img/GridMenu/Table.svg')},
        {type:'file',tip:'Add File',src:require('@/assets/img/GridMenu/File.svg')},
        {type:'timer',tip:'Add Timer',src:require('@/assets/img/GridMenu/Calendar.svg')},
      ]
    }
  },
  methods:{
    onSectionAddMenuClick(item,index){
      console.log(item,index)
      this.addNewItem(item.type)
    },
    onKrakenEditorLoadData(p){
      this.$emit('loadData',p)
    },
    onClickOutsideOfModal(){
      if(this.modalClickDebounce) return;
      this.onShowModal({showModal:false})
      this.showEdit = false
    },
    onShowModal(resp) {
      this.$emit('showModal',resp)
    },
    onDeleteSection(){
      DeleteSection(this.groupID,this.sectionID);
    },
    onEditSection(){
      this.modalClickDebounce = true;
      setTimeout(()=>{this.modalClickDebounce=false;},100)
      this.onShowModal({showModal:true})
      this.showEdit = true;
    },
    onAddNewItem(){
     this.showAddMenu = true;
    },
    addNewItem(type){
      // console.log(this.sectionID)
      let prms = CreateNewItem(this.sectionID,type);
      this.$emit('loadData',prms);
      prms.then(a=>{
        this.$store.dispatch('getElement',{
          type:'section',
          id:this.sectionID,
        }).then(sec=>{
          if(sec.itemID === undefined) this.localSectionItemID = [];
          else this.localSectionItemID = Array.from(sec.itemID);
        })
      })
    },
    onDragDown(e){
      let resp = {
        event: e,
        groupID: this.groupID,
        sectionID: this.sectionID
      }
      this.$emit('onSectionDragDown',resp);
    },
    onDragUp(){
      this.$emit('onSectionDragUp')
    },
    onMouseLeaveAddMenu(){
      this.showAddMenu = false;
    }
  },
  beforeMount() {
    if(this.sectionID >= 0 && this.sectionID !== null){
      this.$store.dispatch('getElement',{
        type:'section',
        id:this.sectionID,
      }).then(sec=>{
        // console.log(sec)
        if(sec.itemID === undefined) this.localSectionItemID = [];
        else this.localSectionItemID = Array.from(sec.itemID);
      })
    }

    // setTimeout(()=>{
    //   this.onShowModal({showModal:true})
    // },5)
  },

}
</script>

<style scoped lang="scss">

.section{
  //background-color: #000;
  //margin-top: 3px;
  margin-right: 3px;
  margin-left: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #FFFFFF;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  //cursor: pointer;

  .mid{
    flex-grow: 1;

    .Header{
      display: flex;
      flex-direction: row;
      justify-content: center;
      .dragIcon{
        justify-self: left;
      }
    }

    .Content{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .Footer{
      display: flex;
    }
  }

  .img{
    //fill: #000000;
    //filter: invert(0%) sepia(83%) saturate(7500%) hue-rotate(215deg) brightness(112%) contrast(115%);
    width:16px ;
    pointer-events: none;
  }

  .actionIcon{
    cursor: pointer;
    width:16px ;
    height: 16px;
  }

}

.sectionPlaceholder{
  background-color: dodgerblue;
}

</style>