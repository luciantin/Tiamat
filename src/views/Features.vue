<template>
  <div class="features">

    <section class="frame" id="features-heading">
      <div class="heading">
        <div class="text">
<!--          <h1>Full Of Features</h1>-->
        </div>
        <img src="@/assets/img/banner/banner-bg-primary.svg" />
      </div>
      <div class="content">
        <img src="@/assets/img/Rectangle.svg" />
        <img src="@/assets/img/Rectangle.svg" />
      </div>
    </section>

    <FeatureSection
        v-for="section in sections"
        v-bind="section"
        :id="section.id"
    />
  </div>
</template>
<script>

import FeatureSection from "@/components/featuresView/FeatureSection";
export default {
  name:"Features",
  components: {FeatureSection},
  data(){
    return{
      sections:[
        {
          id:"ui",
          heading:"UI",
          subHeading:"Freedom and Flexibility",
          cardHeadings:["Dashboards","StuffSpace","Views"],
          cardDesc:["desc1","desc2","desc3"],
          cardImage:["path to image","path to image","path to image"],
        },
        {
          id:"cards",
          heading:"Cards",
          subHeading:"Expand your visual ex",
          cardHeadings:["Dashboards","StuffSpace","Views"],
          cardDesc:["desc1","desc2","desc3"],
          cardImage:["path to image","path to image","path to image"],
        },
        {
          id:"tags",
          heading:"Smart Tags",
          subHeading:"Easy Automation",
          cardHeadings:["Category","StuffSpace","Views"],
          cardDesc:["desc1","desc2","desc3"],
          cardImage:["path to image","path to image","path to image"],
        },
        {
          id:"integration",
          heading:"Integration",
          subHeading:"asdasdasd",
          cardHeadings:["Dashboards","StuffSpace","Views"],
          cardDesc:["desc1","desc2","desc3"],
          cardImage:["path to image","path to image","path to image"],
        },
        {
          id:"privacy",
          heading:"Privacy",
          subHeading:"Expand your visual ex",
          cardHeadings:["Dashboards","StuffSpace","Views"],
          cardDesc:["desc1","desc2","desc3"],
          cardImage:["path to image","path to image","path to image"],
        }
      ]
    }
  },
}
</script>

<style scoped lang="scss">
  .features{
    overflow-x: hidden;
  }

  h1{
    font-size: 30px;
  }

  .frame{
    width: 100vw;
    height: 100vh;
  }

  #features-heading{
    display: flex;
    flex-direction: column;
    .heading{
      .text{
        z-index: 5;
        position: relative;
        top: 40%;
      }
      img{
        display: inline;
        position: relative;
        top: 0px;
        left: 0px;
        width: 100vw;
        z-index: 1;
      }
    }
    .content{
      margin-top: 10%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
</style>