<template>
  <div class="drag">
    <img class="img" src="@/assets/img/GridMenu/DragElem.svg" />
  </div>
</template>

<script>
export default {
  name: "Drag"
}
</script>

<style lang="scss" scoped>
.drag{
  width: 1em;
  height: 1em;
  //background-color: chartreuse;
  cursor: grab;

  .img{
    pointer-events: none;
  }

}
</style>