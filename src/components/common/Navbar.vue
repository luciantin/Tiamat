<template>
  <div id="nav">
    <div id="content">
      <div id="left">
        <router-link to="/">Home</router-link>
      </div>

      <div id="mid">
        <router-link to="/features">Features</router-link>
        <router-link to="/pricing">Pricing</router-link>
        <router-link to="/demo">Demo</router-link>
      </div>

      <div id="right">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">SignUp</router-link>
      </div>
    </div>
    <img alt="Vue logo" src="../../assets/img/navbar/BG.svg">

<!--        <div id="img"></div>-->
  </div>
</template>

<script>


export default {
  name: "Navbar"
}
</script>

<style scoped lang="scss">

#nav {
  overflow: visible;
  position: fixed;
  width: 100%;
  height: 10vh;
  pointer-events: none;
  z-index: 100;

  #content{
    z-index: 2;
    width: 100vw;
    position:absolute;
    display: flex;
    justify-content: center;

    div{
      //padding: 20px;
      margin-top: 0.5vw;
    }

    #left{
      flex-grow: 1;
    }
    #mid{
      flex-grow: 20;
    }
    #right{
      flex-grow: 1;
    }
  }

  a {
    pointer-events: all;
    text-decoration: none;
    padding-left: 20px;
    font-size: 1.2vw;
    //padding-top: 10px;
    //font-weight: bold;
    color: $color-nav-text;
    &.router-link-exact-active {
      color: #42b983;
    }
  }

  img{
    width: 100vw;
  }
}
</style>