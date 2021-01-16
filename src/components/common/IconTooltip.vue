<!-- NOPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->
<!-- NOPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->
<!-- NOPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->
<!-- NOPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->
<!-- NOPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->
<!-- NOPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->
<!-- NOPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->
<!-- NOPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->
<!-- NOPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-->


<template>
  <div class="IconTooltip">
    <img :src="require(`@/assets/img/SectionMenu/${name}.svg`)">
    <span class="tooltiptext">Tooltip text</span>
  </div>
</template>

<script>
export default {
  name: "IconTooltip",
  props:{
    name:String,
    tooltip:String,
  },
}
</script>

<style scoped lang="scss">

img{
  //fill: #000000;
  //filter: invert(0%) sepia(83%) saturate(7500%) hue-rotate(215deg) brightness(112%) contrast(115%);
  width:16px ;
  pointer-events: none;
}

/* Tooltip container */
.IconTooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.IconTooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: fixed;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.IconTooltip .tooltiptext::after {
  content: "";
  position: fixed;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.IconTooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>