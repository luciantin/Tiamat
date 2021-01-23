<template>

<!--  <div v-if="itemData !== null">-->
<!--    {{itemData.type}} {{itemData.content}}-->
<!--  </div>-->

  <div v-if="itemData !== null">
    <GridItemText v-if="itemData.type === 'text'" :content="itemData.content" />
    <GridItemCheckbox v-if="itemData.type === 'checkbox'" :content="itemData.content" />
    <GridItemFile v-if="itemData.type === 'file'" :content="itemData.content" />
    <GridItemImage v-if="itemData.type === 'image'" :content="itemData.content" />
    <GridItemLink v-if="itemData.type === 'link'" :content="itemData.content" />
    <GridItemList v-if="itemData.type === 'list'" :content="itemData.content" />
    <GridItemStuffspace v-if="itemData.type === 'stuffspace'" :content="itemData.content" />
    <GridItemTable v-if="itemData.type === 'table'" :content="itemData.content" />
  </div>


</template>

<script>
import GridItemText from "@/components/grid/Factory/Items/GridItemText";
import GridItemCheckbox from "@/components/grid/Factory/Items/GridItemCheckbox";
import GridItemFile from "@/components/grid/Factory/Items/GridItemFile";
import GridItemImage from "@/components/grid/Factory/Items/GridItemImage";
import GridItemLink from "@/components/grid/Factory/Items/GridItemLink";
import GridItemList from "@/components/grid/Factory/Items/GridItemList";
import GridItemStuffspace from "@/components/grid/Factory/Items/GridItemStuffspace";
import GridItemTable from "@/components/grid/Factory/Items/GridItemTable";
export default {
  name: "ItemFactory",
  components: {
    GridItemTable,
    GridItemStuffspace,
    GridItemList, GridItemLink, GridItemImage, GridItemFile, GridItemCheckbox, GridItemText},
  props: {
    itemID:Array,
    sectionID:String,
    groupID:String,
    containerID:String,
    gridType:String,
  },
  data(){
    return{
      itemData:null,
    }
  },
  beforeCreate() {
    if (this.itemID >= 0 && this.itemID !== null) {
      this.$store.dispatch('getElement', {
        type: 'item',
        id: this.itemID,
      }).then(item => {
        this.itemData = item
      })
    }
  }
}
</script>

<style scoped>

</style>