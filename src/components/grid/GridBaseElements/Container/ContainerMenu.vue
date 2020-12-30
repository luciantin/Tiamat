<template>
  <div class="containerMenu"  @mouseenter="mouseEnterMenu" @mouseleave="mouseLeaveMenu">

  </div>
</template>

<script>
export default {
  name: "ContainerMenu",
  props:{
    type:String,
    containerID: String,
  },
  data(){
    return{
      isHovered:false,
    }
  },
  methods:{
    mouseEnterMenu(){
      this.isHovered = true;
      console.log(this.containerID)
    },
    mouseLeaveMenu(){
      this.isHovered = false;
    }
  }
}
</script>

<style scoped>
.containerMenu{
  width: 1em;
  height: 1em;
  background-color: chartreuse;
}
</style>