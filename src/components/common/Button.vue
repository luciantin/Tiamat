<template>
  <div class="Button" @click="$emit('buttonClick')">
    <h2>{{text}}</h2>
  </div>
</template>

<script>
export default {
  name: "Button",
  props:['text'],
  emits:['buttonClick'],
}
</script>

// {"base":"#de1e1","hover":"#asdas"}

<style  lang="scss">

.Button{
  background-color: $color-action-primary;
  color: $color-action-text;
  box-shadow: $box-shadow-s;
  border: none;
  display: inline-block;
  //margin: 0.5em 0;
  padding: 1em 2em;

  font-size: 1em;
  line-height: 1;
  cursor: pointer;

  &:hover{
    background-color: $color-action-secondary;
    box-shadow: $box-shadow-inset;
  }
}

</style>