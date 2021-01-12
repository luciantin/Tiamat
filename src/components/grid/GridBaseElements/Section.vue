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
        <ItemFactory v-if="showSectionItems" v-for="(item,index) in localSectionItemID" :itemID="item" />
      </div>
      <div class="Footer">

      </div>

    </div>

    <div class="right">
      <div  class="actionIcon" @click="onAddNewItem">
        <img class="img "  src="@/assets/img/GridMenu/Edit.svg"/>
      </div>
      <div  class="actionIcon" @click="onDeleteSection">
        <img class="img" src="@/assets/img/GridMenu/Delete.svg"/>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="sectionPlaceholder" :id="makePlaceholderId([containerID,groupID])">Placeholder</div>
  </div>

</template>

<script>
import {DeleteSection} from "@/components/grid/ElementHelpers/elementDelete";
import ItemFactory from "@/components/grid/Factory/ItemFactory";
import {CreateNewItem} from "@/components/grid/ElementHelpers/elementCreate";
import {makeDragId,wrapId,makePlaceholderId} from "@/components/grid/gridID.factory";

export default {
  name: "Section",
  components: {ItemFactory},
  props:{
    sectionID:String,
    groupID:String,
    containerID:String,
    index:Number,
    showSectionItems:Boolean
  },
  emits:['loadData','onSectionDragDown','onSectionDragUp'],
  data(){
    return{
      localSectionItemID : null,
      localSectionMeta : null,
      localSectionType : null,
      makeDragId:makeDragId,
      wrapId:wrapId,
      makePlaceholderId:makePlaceholderId
    }
  },
  methods:{
    onDeleteSection(){
      DeleteSection(this.groupID,this.sectionID);
    },
    onAddNewItem(){
      // console.log(this.sectionID)
      let prms = CreateNewItem(this.sectionID);
      this.$emit('loadData',prms);
      prms.then(a=>{
        this.$store.dispatch('getElement',{
          type:'section',
          id:this.sectionID,
        }).then(sec=>{
          console.log(sec)
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
  },

}
</script>

<style scoped lang="scss">

.section{
  //background-color: #000;
  margin-top: 3px;
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
  }

}

.sectionPlaceholder{
  background-color: dodgerblue;
}

</style>