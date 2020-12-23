<template>

</template>

<script>
export default {
  name: "Logout",
  mounted() {
    this.$store.dispatch('logOut');
    this.$router.push({path:'/'});
  }
}
</script>

<style scoped>

</style>