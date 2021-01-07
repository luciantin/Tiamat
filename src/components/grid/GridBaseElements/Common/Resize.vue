<template>
  <div class="drag"></div>
</template>

<script>
export default {
  name: "Resize"
}
</script>

<style lang="scss" scoped>
.drag{
  width: 0.5em;
  height: 0.5em;
  background-color: chartreuse;
  cursor: se-resize;
}
</style>