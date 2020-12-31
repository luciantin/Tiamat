<template>
  <div class="ElementMenuItem" @click="$emit('ItemClick',id)" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <img :src="require(`@/assets/img/GridMenu/${icon}`)">
    <p v-if="showToolTip" class="tooltip">{{text}}</p>
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

<style scoped lang="scss">
  .tooltip{
    position: absolute;
  }

</style>