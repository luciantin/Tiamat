<template>

  <Navbar v-if="isDisplayNavbar()" />

  <router-view/>

</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/common/Navbar";
import Dashboard from "@/components/dashboard/Dashboard";
import Button from "@/components/common/Button";
import Grid from "@/components/grid/Grid.vue";

export default {
  name: 'App',
  components: {
    Grid,
    Button,
    Dashboard,
    Navbar,
  },
  methods:{
    isDisplayNavbar(){
      let navbarRoutes = ["/","/login","/signup","/about","/pricing","/demo","/features"];
      return navbarRoutes.includes(this.$route.path);
    }
  }
}
</script>

<style lang="scss">

//@import "scss/variables/colors";

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none; // TODO
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>


<!--
@import "src/scss/variables/colors";

  prependData: `
                import "@/scss/variables/color.scss";
                import "@/scss/variables/fonts.scss";`
-->