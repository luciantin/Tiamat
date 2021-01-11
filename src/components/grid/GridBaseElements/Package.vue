<template>
  <div class="Item">
    <p>{{groupID}}</p>
    <p>{{sectionID}}</p>
    <p>t</p>
  </div>
</template>

<script>
export default {
  name: "Package",
  props:{
    sectionID:Object,
    groupID:String,
  },
}
</script>

<style scoped>



.Item{

  background-color: #000;
  margin-top: 3px;
  /*height: 30px;*/
}

</style>