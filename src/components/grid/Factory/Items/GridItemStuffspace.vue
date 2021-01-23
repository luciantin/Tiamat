<template>
  <p @click="onStuffspaceClick">stuffspace {{content}}</p>
</template>

<script>
export default {
  name: "GridItemStuffspace",
  props:{
    content:String,
  },
  methods:{
    onStuffspaceClick(){
      this.$router.push({path:'/stuffspace',query:{id:this.content}});
    }
  }
}
</script>

<style scoped>

</style>