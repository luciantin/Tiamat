<template>
<!--  <p>Hello World</p>-->
  <Dashboard></Dashboard>
</template>


<script>

import Dashboard from "@/components/Dashboard";

export default {
  name: 'App',
  components: {Dashboard,},
  data(){
    return{}
  },
  methods:{

  },
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}
</style>
