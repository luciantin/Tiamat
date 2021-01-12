<template>
  <div class="group" @mouseleave="onMouseLeaveGroup" @mouseenter="onMouseEnterGroup" @mouseover="onMouseOverGroup">

    <div class="groupHeader">
      <div class="Left">
        <slot name="GroupDrag"></slot>
      </div>
      <div class="Mid">
        <h4 @click="onTitleClick" v-if="!showTitleInput">{{localMeta.title}}</h4>
        <input  ref="input"  :value="localMeta.title" v-else @focusout="onFocusOutOfTitleInput">
      </div>
      <div class="Right">
        <div class="GroupMenuButton">
          <img src="@/assets/img/GridMenu/MenuElem.svg"  @click="onGroupMenuClick" />
        </div>
      </div>
    </div>


    <div v-if="!showSettings"  class="groupItems" >
      <Section
          v-for="(id,index) in sections"
          :groupID="GroupID"
          :sectionID="id"
          :containerID="containerID"
          :index="index"
          :key="index"
          :showSectionItems="showSectionItems"
          @loadData="onSectionLoadData"
          @onSectionDragDown="onSectionDragDown"
          @onSectionDragUp="onSectionDragUp"
      />
      <div v-if="showAddButton" class="AddNewButton" @click="onAddNewSection">Add</div>

    </div>



      <CommonElementMenu
          v-else
          class="GroupSettings"
          :elementType="'group'"
          :elementID="GroupID"
          :gridType="GridType"
          @MenuItemClick="onMenuItemClick"
      />

    <div class="GroupFooter">
      <slot name="GroupFooter" />
    </div>

  </div>
</template>

<script>

import Section from "@/components/grid/GridBaseElements/Section";
import CommonElementMenu from "@/components/grid/GridBaseElements/Common/ElementMenu/CommonElementMenu";
import {DeleteGroupFromContainer} from "@/components/grid/ElementHelpers/elementDelete";
import {CreateNewSection} from "@/components/grid/ElementHelpers/elementCreate";
import {makePlaceholderId} from "@/components/grid/gridID.factory";

export default {
  name: "Group",
  components: {CommonElementMenu, Section},
  props:{
    containerID:String,
    group:Object,
    meta:String,
    GroupID:String,
    GridType:String,
    sectionPlaceholderPos:Number,
    showSectionItems:Boolean,
  },
  emits:['loadData','onSectionDragUp','onSectionDragDown'],
  data(){
    return{
      showSettings:false,
      showTitleInput:false,
      showAddButton:false,
      isSectionBeingDragged:false,
      localMeta:{},
      makePlaceholderId:makePlaceholderId,
    }
  },
  methods:{
    onSectionDragDown(e){
      this.isSectionBeingDragged=true;
      this.$emit('onSectionDragDown',e);
    },
    onSectionDragUp(e){
      this.isSectionBeingDragged=false;
      this.$emit('onSectionDragUp',e);
    },
    onSectionLoadData(p){
      this.$emit('loadData',p)
    },
    onGroupMenuClick(){
      this.showSettings = true;
    },
    onMouseLeaveGroup(){
      this.showSettings = false;
      this.showAddButton = false;
      this.isSectionBeingDragged = false;
    },
    onMouseEnterGroup(){
      this.showAddButton = true;
    },
    onTitleClick(){
      this.showTitleInput = true;
    },
    onFocusOutOfTitleInput(e){
      this.localMeta.title = e.srcElement.value;
      this.$store.dispatch('setElementByKey',{
        type:'group',
        id:this.GroupID,
        key:'meta',
        val:this.localMeta
      })
      this.showTitleInput = false;
    },
    onAddNewSection(){
      CreateNewSection(this.GroupID);
    },
    createLocalMeta(){
      let tmp = Object.assign({},this.meta);
      delete tmp.tags;
      this.localMeta = {
        tags:Array.from(this.meta.tags),
        ...tmp
      }
    },
    onMouseOverGroup(){
      // if(this.isSectionBeingDragged) console.log('TESTTESTESTESTETS')
    },
    onMenuItemClick(item) {
      console.log(item.id)
      let res = null;
      if(item.id === 'Delete') res =  DeleteGroupFromContainer(this.GroupID,this.containerID)
      this.$emit('loadData',res)
      this.showSettings = false;
    }
  },
  computed:{
    sections: function (){
      let res;
      if(this.sectionPlaceholderPos < 0) res = this.group.sectionID;
      else{
      res = Array.from(this.group.sectionID);
      res.splice(this.sectionPlaceholderPos,0,-1)
      }
      // else return
      return res;
    }
  },
  mounted() {
    this.createLocalMeta();
  },
  updated() {
    if(this.showTitleInput) this.$refs.input.focus()
  }
}
</script>

<style lang="scss" scoped>

.group{
  //background-color: darkcyan;
  display: flex;
  flex-direction: column;
  //padding: 10px;
  overflow: hidden;

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;


  .groupHeader{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    background-color: #D4C324;
    min-height: 2em;
    align-items: center;
    padding: 0px 8px;

    &:hover{
      .Left{
        visibility: visible;
      }
      .Right{
        visibility: visible;
      }
    }

    .Left{
      visibility: hidden;
      justify-self: left;
      grid-area: 1 / 1 / 2 / 2;
    }
    .Mid{
      justify-self: center;
      grid-area: 1 / 2 / 2 / 3;
    }
    .Right{
      visibility: hidden;
      justify-self: right;
      grid-area: 1 / 3 / 2 / 4;
    }
  }

  .groupItems{
    overflow: hidden;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    &:hover{
      overflow-y: auto;
    }
    scrollbar-width: thin;

    .AddNewButton{
      background-color: #D4C324;
      margin: 5px;
      cursor: pointer;

      &:hover{
        background-color: chartreuse;
      }
    }
  }

  .GroupMenuButton{
    width: 1.1em;
    height: 1.1em;
    //background-color: chartreuse;
  }

  .GroupSettings{
    flex-grow: 1;
  }

  .GroupFooter{
    display: flex;
    flex-direction: row;
    justify-content: right;
  }

}

</style>