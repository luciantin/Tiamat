<template>
  <div class="Button">
    <h2>{{text}}</h2>
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
  },
  // data(){
  //   return{
  //     hoveredOver:false,
  //   }
  // },
  // computed:{
  //   buttonColor(){
  //
  //   },
  // },
  // methods:{
  //   mouseOver(){
  //     this.hoveredOver = !this.hoveredOver;
  //   }
  // }
}
</script>

// {"base":"#de1e1","hover":"#asdas"}

<style  lang="scss">

.Button{
  background-color: $color-action-primary;
  color: $color-action-text;
  box-shadow: $box-shadow-s;

  display: inline-block;
  margin: 0.5em 0;
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