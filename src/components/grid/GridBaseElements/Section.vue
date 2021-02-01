<template>
  <div
      v-if="sectionID >= 0"
      class="section"
      :id="wrapId([containerID,groupID,sectionID])"
      :index="index"
      :style="[styleData.section.style]"
  >
      <div class="left">
      </div>
      <div class="mid">
        <div class="Header" v-if="showTitle" >

          <div v-if="!showMenu" class="menuItemsRow">
<!--            <div  class="actionIcon" @click="onEditSection">-->
<!--              <img class="img "  src="@/assets/img/GridMenu/Edit.svg"/>-->
<!--            </div>-->
            <div  class="actionIcon" @click="onAddNewItem">
              <img class="img "  src="@/assets/img/GridMenu/Add.svg"/>
            </div>
          </div>

          <div v-if="showMenu" @mouseleave="onMouseLeaveAddMenu" class="menuItemsRow">
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

<!--          <div class="actionIcon dragIcon" :id="makeDragId([containerID,groupID,sectionID])"  @mousedown="onDragDown" @mouseup="onDragUp">-->
<!--            <img class="img" src="@/assets/img/GridMenu/DragElem.svg"/>-->
<!--          </div>-->

          <div >
            <h4 @click="onTitleClick" class="titleText" v-if="!showTitleInput">{{localSectionMeta['title']}}</h4>
            <input  ref="input" class="titleInput" :value="localSectionMeta['title']" v-else @focusout="onFocusOutOfTitleInput">
          </div>


<!--          <div class="actionIcon dragIcon" :id="makeDragId([containerID,groupID,sectionID])"  @mousedown="onDragDown" @mouseup="onDragUp">-->
<!--            <img class="img" src="@/assets/img/GridMenu/DragElem.svg"/>-->
<!--          </div>-->

          <div class="menuItemsRow">
            <div  class="actionIcon" @click="onDeleteSection">
              <img class="img" src="@/assets/img/GridMenu/Delete.svg"/>
            </div>
          </div>





<!--          <p>asdaWWsd</p>-->
        </div>


        <div class="Content" >
          <div class="item" v-for="(item,index) in localSectionItemID" >
            <div class="underline"></div>
            <ItemFactory
                v-if="showSectionItems"
                :key="item"
                :itemID="item"
                :sectionID="sectionID"
                :groupID="groupID"
                :gridType="gridType"
                :containerID="containerID"
                @onItemDelete="onItemDelete"
            />
          </div>
        </div>


        <div class="Footer">

        </div>
      </div>


      <div class="right">

      </div>
  </div>

  <div v-else>
    <div class="sectionPlaceholder" :id="makePlaceholderId([containerID,groupID])">Placeholder</div>
  </div>

  <Teleport v-if="showEdit" :to="`#${modalID}`" >
    <div v-click-outside="onClickOutsideOfModal" >
<!--      <h2>Twegwegwesd wrge wgrgw rg er</h2>-->
      <ItemEditor
        :itemID="localSectionItemID"
        :sectionID="sectionID"
        :sectionAddMenuItems="sectionAddMenuItems"
        :addNewItem="addNewItem"
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
import IconTooltip from "@/components/common/IconTooltip";
import Tooltip from "@/components/common/Tooltip";
import {ElementsFactory} from "@/factory/elementsFactory/elementsFactory";
import ItemEditor from "@/components/grid/GridBaseElements/Common/ItemEditor";

export default {
  name: "Section",
  components: {ItemEditor, Tooltip, IconTooltip, ItemFactory},
  props:{
    sectionID:String,
    groupID:String,
    containerID:String,
    gridType:String,
    index:Number,
    showSectionItems:Boolean,
    modalID:String,
    styleData:Object,
  },
  emits:['loadData','onSectionDragDown','onSectionDragUp','showModal','onSectionDelete'],
  data(){
    return{
      showTitleInput:false,
      localSectionItemID : null,
      localSectionMeta : {},
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
        // {type:'list',tip:'Add List',src:require('@/assets/img/GridMenu/List.svg')},
        {type:'image',tip:'Add Image',src:require('@/assets/img/GridMenu/Image.svg')},
        {type:'checkbox',tip:'Add Checkbox',src:require('@/assets/img/GridMenu/TickSquare.svg')},
        {type:'link',tip:'Add Link',src:require('@/assets/img/GridMenu/Info.svg')},
        // {type:'table',tip:'Add Table',src:require('@/assets/img/GridMenu/Table.svg')},
        // {type:'file',tip:'Add File',src:require('@/assets/img/GridMenu/File.svg')},
        // {type:'timer',tip:'Add Timer',src:require('@/assets/img/GridMenu/Calendar.svg')},
      ]
    }
  },
  // watch:{
  //   localSectionItemID(New,Old){
  //    // console.log(New,Old)
  //   }
  // },
  methods:{
    onItemDelete(e) {

      this.$emit('loadData',e)

      e.then(a=>{
        this.loadSectionItemID();
      })
    },
    onTitleClick(){
      this.showTitleInput = true;
    },
    onFocusOutOfTitleInput(e){
      this.localSectionMeta.title = e.srcElement.value;
      this.$store.dispatch('setElementByKey',{
        type:'section',
        id:this.sectionID,
        key:'meta',
        val:this.localSectionMeta
      })
      this.showTitleInput = false;
    },
    onSectionAddMenuClick(item,index){
      // console.log(item,index)
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
      DeleteSection(this.groupID,this.sectionID).then(a=>{
        this.$emit('onSectionDelete');
      });
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
      let elFac = new ElementsFactory()

      let meta = elFac.createMeta({
        title:'New',
        description:'New',
        tags: ['New']
      })

      let item = elFac.createItem({
        type: type,
        content:'',
        meta:meta
      })

      // console.log(this.sectionID)
      let prms = CreateNewItem(this.sectionID,item);
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
    },
    createLocalMeta(meta){
      let tmp = Object.assign({},meta);
      delete tmp.tags;
      this.localSectionMeta = {
        tags:Array.from(meta.tags),
        ...tmp
      }
      // console.log(this.localSectionMeta)
    },
    loadSectionItemID(){
      if(this.sectionID >= 0 && this.sectionID !== null){
        this.$store.dispatch('getElement',{
          type:'section',
          id:this.sectionID,
        }).then(sec=>{
          // console.log(sec)
          if(sec.itemID === undefined) this.localSectionItemID = [];
          else {
            this.localSectionItemID = Array.from(sec.itemID);
          }
        })
      }
    }
  },
  computed:{
    showMenu(){
      if(!this.styleData.section.menu) return false;
      else return  this.showAddMenu
    },
    showTitle(){
      return this.styleData.section.title
    }
  },
  beforeMount() {
    this.loadSectionItemID()
  },
  mounted() {
    if(this.sectionID >= 0 && this.sectionID !== null){
      this.$store.dispatch('getElement',{
        type:'section',
        id:this.sectionID,
      }).then(sec=>{
        this.createLocalMeta(sec.meta)
      })
    }
    // console.log(this.localSectionMeta)
  }

}
</script>

<style scoped lang="scss">

//.section{
//}

.section{
  //background-color: #000;
  //margin-top: 3px;
  padding: 5px;

  //margin-right: 5px;
  //margin-left: 5px;
  margin: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #FFFFFF;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  //cursor: pointer;

  .mid{
    flex-grow: 1;
    width: 100%;
    .Header{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .dragIcon{
        justify-self: left;
      }
    }

    .Content{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      justify-items: center;
      flex-grow: 1;

      .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

    }

    .Footer{
      display: flex;
      justify-content: center;
    }
  }

  .img{
    //fill: #000000;
    //filter: invert(0%) sepia(83%) saturate(7500%) hue-rotate(215deg) brightness(112%) contrast(115%);
    width:16px ;
    pointer-events: none;
    fill: black;
  }
  svg{
    width: 16px;
    height: 16px;
    //viewBox:"0 0 512 512";
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

.menuItemsRow{
  display: flex;
  flex-direction: row;
  //justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
}

.underline{
  height: 2px;
  background-color: black;
  width: 80%;
}
.titleInput{
  font-family: Arial, sans-serif;
  font-size: 100%;
  width: 95%;
  pointer-events: all;
  border: none;
  user-select: initial;
  text-align: center;
  background-color: rgba(0,0,0,0);
  font-weight: bold;
  &:focus{
    outline: none;
  }
}

</style>