<template>

  <div class="feature-card">
    <img src="@/assets/img/Rectangle.svg" />
    <h1 class="heading">{{heading}}</h1>
    <p  class="desc">{{desc}}</p>
  </div>

</template>

<script>
export default {
  name: "FeatureCard",
  props:{
    heading:String,
    image:String,
    desc:String,
  }
}
</script>

<style scoped>

</style>