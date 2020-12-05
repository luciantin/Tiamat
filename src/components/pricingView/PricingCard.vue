<template>
  <div class="pricing-card">
    <section class="heading">
      <img  src="@/assets/img/pricing/heading.svg" />
      <h1>{{heading}}</h1>
    </section>
    <section class="content">
      <ul>
        <li v-for="i in contentList"> {{i}} </li>
      </ul>
    </section>
    <section class="price">
      <h2 v-if="price>0">{{price}} $</h2>
      <h2 v-else>FREE !</h2>
      <Button :text="buttonText" />
    </section>
  </div>

</template>

<script>
import Button from "@/components/common/Button";
export default {
  name: "PricingCard",
  components: {Button},
  props:{
    price:Number,
    id:String,
    heading:String,
    contentList:Array,
    buttonText:String,
  }
}
</script>

<style scoped lang="scss">

  .pricing-card{
    //width: 20vw;
    background: #FFFFFF;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    //padding: 20px;

    .heading{
      display: inline;

      h1{
        display: inline;
        z-index: 5;
        position: relative;
        top: -115px;
        //top: 0px;
        left: 0px;
        font-size: 1rem;

      }
      img{
        display: inline;
        position: relative;
        top:0px;
        left: 0px;
        width: 100%;
        z-index: 1;
      }
    }

    .content{
      //position: relative;
      //left: 40px;
      //top: -30px;
      ul{
        margin-left: 15px;
        text-align: left;
      }
    }

  }


</style>