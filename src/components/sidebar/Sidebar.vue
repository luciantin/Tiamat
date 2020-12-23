<template>
  <div class="sidebar">

    <div class="top">
      <slot name="top"/>
    </div>

    <div class="mid">
      <slot name="middle"/>
    </div>

    <div class="bot">
      <slot name="bottom"/>
    </div>

  </div>
</template>

<script>
export default {
name: "Sidebar"
}
</script>

<style scoped lang="scss">

</style>