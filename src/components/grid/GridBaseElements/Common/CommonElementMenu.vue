<template>
  <div class="CommonElementMenu" >
    <div class="TopRow">
      <slot name="TopRow" />
    </div>
    <div class="MidRow">
      <slot name="MidRow" />
    </div>
    <div class="BotRow">
      <slot name="BotRow" />
    </div>

  </div>


</template>

<script>
export default {
name: "CommonElementMenu",
  props:{

  }
}
</script>

<style scoped>

</style>