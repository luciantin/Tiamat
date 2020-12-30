<template>
  <div class="ElementMenuItem" @click="$emit('ItemClick',id)" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <img :src="icon">
    <p v-if="showToolTip">{{text}}</p>
  </div>
</template>

<script>
export default {
  name: "ElementMenuItem",
  props:{
    icon:String,
    id:String,
    text:String
  },
  data(){
    return{
      showToolTip: false,
    }
  },
  methods:{
    mouseEnter(){
      this.showToolTip = true;
    },
    mouseLeave(){
      this.showToolTip = false;
    }
  },
  emits:['ItemClick'],
}
</script>

<style scoped>

</style>