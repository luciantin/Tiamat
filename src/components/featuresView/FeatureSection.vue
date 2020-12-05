<template>

  <section class="feature-section">

    <div class="feature-heading">
      <div class="content">
        <h1>{{heading}}</h1>
        <h2>{{subHeading}}</h2>
      </div>
      <img src="@/assets/img/banner/banner-bg-tertiary.svg" />
    </div>

    <div class="feature-content">
      <FeatureCard v-for="(n,i) in 3" :heading="cardHeadings[i]" :desc="cardDesc[i]" :image="cardImage[i]" :key="i" />
    </div>

  </section>

</template>

<script>
import FeatureCard from "@/components/featuresView/FeatureCard";
export default {
  name: "FeatureSection",
  components: {FeatureCard},
  props:{
    id:String,
    heading:String,
    subHeading:String,
    cardHeadings:Array,
    cardDesc:Array,
    cardImage:Array,
  },
}
</script>

<style scoped lang="scss">

.feature-section{
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 90vh;

  .feature-heading{

    .content{
      display: flex;
      position: relative;
      top: 40%;
      left: 0px;
      z-index: 5;
      justify-content: space-evenly;
      align-items: center;
      h1{
        font-size: 5vw;
          color: white;
      }
      h2{
        font-size: 4vw;
          text-decoration: underline;
          color: white;
      }
    }
    img{
      width: 110vw;
      position: relative;
      top: 0px;
      left: -5px;
      z-index: 1;
    }
  }

  .feature-content{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
  }

}


</style>