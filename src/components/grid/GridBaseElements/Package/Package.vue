<template>
  <div class="Item">
    <p>{{ID}}</p>
    <p>{{sectionID}}</p>
  </div>
</template>

<script>
export default {
  name: "Package",
  props:{
    sectionID:{
      type: Object,
      // required: true,
    },
    ID:{
      type: String,
      // required: true,
    },
  },
  mounted() {
    // console.log("TASK",this.task)
  }
}
</script>

<style scoped>
.Item{
  background-color: #8095ad;
  margin-top: 3px;
}

</style>