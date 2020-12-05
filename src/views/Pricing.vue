<template>
  <div class="pricing">
    <section class="cards">
      <PricingCard  v-for="(n,i) in 3" :id="cardsData[i].id" v-bind="cardsData[i]"/>
    </section>
    <footer>
      <div class="content">
      </div>
      <img  src="@/assets/img/pricing/footer.svg"/>
    </footer>
  </div>
</template>

<script>
import PricingCard from "@/components/pricingView/PricingCard";
export default {
  name: "Pricing",
  components: {PricingCard},
  data(){
    return{
      cardsData:[
        {
          price:0,id:"simple",heading:"tr",
          contentList:["3 Taskspaces","Unlimited Cards","3 Taskspaces","Unlimited Cards"],buttonText:"Try now"
        },
        {
          id:"free",price:3.99,heading:"tr",buttonText:"Buy now",
          contentList:["3 Taskspaces","Unlimited Cards","3 Taskspaces","Unlimited Cards"]
        },
        {
          id:"next",price:6.99,heading:"tr",buttonText:"Buy now",
          contentList:["3 Taskspaces","Unlimited Cards","3 Taskspaces","Unlimited Cards"]
        },
      ]
    }
  }
}
</script>

<style scoped lang="scss">

.pricing{
  width: 100vw;
  height: 100vh;
}

.cards{
  padding-top: 30vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  img{
    width: 100vw;
    position: fixed;
    bottom: -10px;
    left: 0;
  }
}


</style>