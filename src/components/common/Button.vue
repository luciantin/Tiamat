<template>
  <div class="Button">
    {{this.text}}
  </div>
</template>

<script>
export default {
  name: "Button",
  props:{
    bType:{  // "action"
      type: String
    },
    text:{
      type: String
    }
  }
}
</script>

// {"base":"#de1e1","hover":"#asdas"}

<style  lang="scss">

.Button{
  display: inline;
  background-color: $color-action-primary;
  color: $color-action-text;
  box-shadow: $box-shadow-s;
  margin: 10px;
  padding: 20px 40px;

  &:hover{
    background-color: $color-action-secondary;
    box-shadow: $box-shadow-inset;
  }
}

</style>