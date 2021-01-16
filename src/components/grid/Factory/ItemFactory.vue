<template>
  <div v-if="itemData !== null">
    {{itemData.type}}
  </div>
</template>

<script>
export default {
  name: "ItemFactory",
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