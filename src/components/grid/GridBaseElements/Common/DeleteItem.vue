<template>
  <div  class="actionIcon" @click="onClickDelete">
    <img class="img" src="@/assets/img/GridMenu/Delete.svg"/>
  </div>
</template>

<script>

import {DeleteItemFromSection} from "@/components/grid/ElementHelpers/elementDelete";

export default {
name: "DeleteItem",
  props:{
    secID:Number,
    itemID:Number,
  },
  data(){

  },
  methods:{
    onClickDelete(){
      // console.log(this.secID,this.itemID)
      this.$emit('onItemDelete',DeleteItemFromSection(this.secID, this.itemID));
    }
  },
  emits:['onItemDelete',],

}
</script>

<style scoped lang="scss">
.actionIcon{
  cursor: pointer;
  img{
    width: 14px ;
    height: 14px;
  }
}
</style>