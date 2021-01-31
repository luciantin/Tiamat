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
      this.$emit('onItemDelete',DeleteItemFromSection(this.secID, this.itemID));
    }
  },
  emits:['onItemDelete',],

}
</script>

<style scoped>
.actionIcon{
  cursor: pointer;
  width:16px ;
  height: 16px;
}
</style>