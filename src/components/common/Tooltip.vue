<template>
  <div  @mouseleave="onMouseLeave">
    <div  ref="content" @mouseover="onContentMouseOver" >
      <slot name="content">

      </slot>
    </div>
    <div
        class="Tooltip"
        v-if="showTooltip"
        ref="tooltip"
        :style="{
          top: `${tTop}px`,
          left: `${tLeft}px`,
        }"
    >
      <slot name="tooltip" >

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props:{
    position:String,
  },
  data(){
    return{
      showTooltip:true,
      tTop:-100,
      tLeft:-100,
    }
  },
  methods:{
    onMouseLeave() {
      this.showTooltip = false
    },
    onContentMouseOver(e){
      this.showTooltip = true
      // console.log(,e)
      // if(this.position === 'Top')
      // if(this.position === 'Bottom')
      // if(this.position === 'Left')
      // if(this.position === 'Right')
      let BB = this.$refs.content.getBoundingClientRect()
      this.tTop = BB.top ;
      this.tLeft = BB.left + 30;
    }
  }
}
</script>

<style scoped lang="scss">

 .Tooltip{
   position: fixed;
   background-color: #FFFFFF;
   z-index: 1;

   background-color: #555;
   color: #fff;
   padding: 5px 5px;
   border-radius: 6px;
   /* Fade in tooltip */
   //opacity: 0;
   //transition: opacity 0.3s;

 }

 .Tooltip::after {
   content: "";
   position: absolute;
   top: 25%;
   left: 0%;
   margin-left: -10px;
   border-width: 5px;
   border-style: solid;
   border-color: #555 transparent transparent transparent;
   transform: rotate(90deg);
 }


</style>