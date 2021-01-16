<template>
  <div class="Editor">
    <p>{{itemID}}</p>

  </div>
</template>

<script>
export default {
  name: "KrakenEditor",
  props:{
    itemID:Object,
  }
}
</script>

<style scoped>

  .Editor{
    background-color: #FFFFFF;
  }

</style>