<template>
  <div id="dashboard">
<!--  <p>    {{renderID}}</p>-->

  <Grid :type="type" />

  </div>
</template>

<script>
import Grid from "@/components/grid/Grid";
export default {
  name:'StuffSpace',
  components: {Grid},
  props:{

  },
  data(){
    return{
      renderID : 0,
      type : 'stuffspace',
    }
  },
  mounted() {
    this.renderID = this.$route.query.id; // set render id from query string
  }

}
</script>


<style scoped lang="scss" >



</style>
