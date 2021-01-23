<template>
  <div id="dashboard">
    <Grid  :type="type"  />
  </div>
</template>

<script>
import Grid from "@/components/grid/Grid";
export default {
  name:'Dashboard',
  components: {Grid},
  props:{

  },
  data(){
    return{
      renderID : 0,
      type : 'dashboard',
    }
  },
  mounted() {
    this.renderID = this.$route.query.id; // set render id from query string
  }

}
</script>


<style scoped lang="scss" >



</style>
