<template>
  <div class="Editor">
    <h2>Item Editor</h2>
<!--    <p>{{itemID}}</p>-->

    <div class="itemAddMenu">
      <Tooltip v-for="(item,index) in sectionAddMenuItems" :key="index">
        <template v-slot:content>
          <div  class="actionIcon" @click="addNewItem(item.type)">
            <img class="img" :src="item.src"/>
          </div>
        </template>
        <template v-slot:tooltip>
          <p>{{item.tip}}</p>
        </template>
      </Tooltip>
    </div>

    <div class="items">
      <div class="item" v-for="(item, index) in itemDataArr" :key="index">

<!--        <h3 class="itemType">{{item.type}}</h3>-->

        <div v-if="item.type==='text'"  class="itemTextInput">
          <textarea class="inputWidth" :value="item.content"  spellcheck="false" rows="2" cols="40"> </textarea>
        </div>

        <div v-if="item.type==='checkbox'" class="itemCheckboxInput">
          <input type="checkbox" :value="item.content.checked">
          <input class="inputWidth" :value="item.content.text" type="text" rows="1" cols="40">
        </div>

        <div v-if="item.type==='link'" class="itemLinkInput">
          <input class="inputWidth" type="text" rows="1" cols="40">
        </div>

        <div class="itemDeleteButton">
          <img :src="require('@/assets/img/GridMenu/Delete.svg')"/>
        </div>

      </div>
    </div>




    <Button :text="'Save'" class="saveButton" @buttonClick="onSaveButtonClick"/>

  </div>
</template>

<script>
import Tooltip from "@/components/common/Tooltip";
import Button from "@/components/common/Button";
export default {
  name: "ItemEditor",
  components: {Button, Tooltip},
  props: {
    sectionID: String,
    itemID: Array,
    sectionAddMenuItems:Array,
    addNewItem:Function,
  },
  emits: ['loadData'],
  data(){
    return{
      itemDataArr:{},
    }
  },
  methods:{
    onSaveButtonClick(){
      // this.itemDataArr
    },
    createLocalItemDataArr(itemIDs){
      this.itemDataArr = {};
      itemIDs.forEach((id)=>{
        if (id >= 0 && id !== null) {
          this.$store.dispatch('getElement', {
            type: 'item',
            id: id,
          }).then(item => {
            if(item.type === 'checkbox' && item.content === ''){
              item.content = {}
              item.content.checked = false;
              item.content.text  = '';
            }
            console.log(item)
            this.itemDataArr[id] = item
          })
        }
      })
    }
  },
  watch:{
    itemID(New,Old){
      this.createLocalItemDataArr(New)
    }
  },
  created() {
    this.itemID.forEach((id)=>{
      if (id >= 0 && id !== null) {
        this.$store.dispatch('getElement', {
          type: 'item',
          id: id,
        }).then(item => {
          this.itemDataArr[id] = item
        })
      }
    })
  }
}
</script>

<style scoped lang="scss">

  .Editor{
    background-color: #FFFFFF;
    margin: 10vh auto;
    //width: 50vw;
    //height: 50vh;
    width: 40vw;
    padding: 30px 30px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    border-radius: 5px;

    .items{
      display: flex;
      flex-direction: column;
      align-items: center;
      max-height: 60vh;
      overflow-y: scroll;

      //align-content: space-evenly;

      .item{
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .itemType{
          padding-right: 10px;
        }
        .itemDeleteButton{
          padding-left: 10px;
          margin-right: 10px;
        }

        .inputWidth{
          font-family: Arial, sans-serif;
          font-size: 100%;
          width: 26em;
          width: 40ch;
        }

        .inputWidthHalf{
          font-family: Arial, sans-serif;
          font-size: 100%;
          width: 13em;
          width: 20ch;
        }

      }

    }

    .itemAddMenu{
      padding-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;

      .actionIcon:hover{
        cursor: pointer;
      }
    }

    .saveButton{
      width: 50%;
      margin-top: 20px;
      margin-bottom: 20px;
      align-self: center;
    }

  }

</style>