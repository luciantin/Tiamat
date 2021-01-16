<template>
  <div class="Editor">
    <p>{{itemID}}</p>
    <p>
      {{itemDataArr}}
    </p>
  </div>
</template>

<script>
export default {
  name: "KrakenEditor",
  props: {
    sectionID: String,
    itemID: Array,
  },
  emits: ['loadData'],
  data(){
    return{
      itemDataArr:{},
    }
  },
  beforeCreate() {
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

<style scoped>

  .Editor{
    background-color: #FFFFFF;
  }

</style>