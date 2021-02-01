<template>
  <div class="CommonMenuElement" >
    <div class="TopRow">
      <ElementMenuItem @click="onMenuItemClick(item)" v-for="(item,index) of items['top']" :key="index" :icon="item.icon" :text="item.text" :id="item.id" />
    </div>
    <div class="MidRow">
      <ElementMenuItem @click="onMenuItemClick(item)" v-for="(item,index) in items['mid']" :key="index" :icon="item.icon" :text="item.text" :id="item.id" />
    </div>
    <div class="BotRow">
      <ElementMenuItem @click="onMenuItemClick(item)" v-for="(item,index) in items['bot']" :key="index" :icon="item.icon" :text="item.text" :id="item.id" />
    </div>

  </div>


</template>

<script>
import ElementMenuItem from "@/components/grid/GridBaseElements/Common/ElementMenu/ElementMenuItem";
import {MenuItems} from "@/components/grid/GridBaseElements/Common/ElementMenu/MenuItems";

export default {
name: "CommonElementMenu",
  components: {ElementMenuItem},
  props:{
    elementType:String,
    gridType:String,
    elementID:Number,
  },
  data(){
    return{
      items:{}
    }
  },
  methods:{
    loadContent(){
      this.items = MenuItems[this.gridType][this.elementType]
    },
    onMenuItemClick(item){
      this.$emit('MenuItemClick',item)
    }
  },
  mounted() {
    this.loadContent();
  },
  emits:['MenuItemClick']
}
</script>

<style scoped lang="scss">
  .CommonMenuElement{
    display: flex;
    flex-direction: column;
    //align-items:  space-between;

    .TopRow{
      display: flex;
      flex-direction: row;
      padding-bottom: 20px;
      justify-content: space-evenly;
    }

    .MidRow{
      display: flex;
      flex-direction: row;
      padding-bottom: 20px;
    }

    .BotRow{
      display: flex;
      flex-direction: row;
      padding-bottom: 20px;
    }

  }


</style>