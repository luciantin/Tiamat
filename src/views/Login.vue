<template>
  <div class="login">
    <section class="content">
      <img src="#/assets/img/Rectangle.svg"/>
    </section>

    <section form>

    </section>

<!--    <Button text="Sign Up" />-->

<!--    <router-link to="/dashboard">Dashboard</router-link> |-->
<!--    <router-link to="/taskspace">Taskspace</router-link> |-->

  </div>
</template>
<script>
import Button from "@/components/common/Button";
export default {
  components: {Button}
}
</script>


<style scoped lang="scss">
  .login{
    background: rgb(83,160,232);
    background: linear-gradient(239deg, rgba(83,160,232,1) 59%, rgba(255,255,255,1) 59%);
    width: 100vw;
    height: 100vw;

    display: flex;
    flex-direction: row;
  }

</style>