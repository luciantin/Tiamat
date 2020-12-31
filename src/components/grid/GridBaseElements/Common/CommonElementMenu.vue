<template>
  <div class="CommonMenuElement" >
    <div class="TopRow">
      <ElementMenuItem v-for="(item,index) of items['top']" :key="index" :icon="item.icon" :text="item.text" :id="item.id" />
    </div>
    <div class="MidRow">
      <ElementMenuItem v-for="(item,index) in items['mid']" :key="index" :icon="item.icon" :text="item.text" :id="item.id" />
    </div>
    <div class="BotRow">
      <ElementMenuItem v-for="(item,index) in items['bot']" :key="index" :icon="item.icon" :text="item.text" :id="item.id" />
    </div>

  </div>


</template>

<script>
import ElementMenuItem from "@/components/grid/GridBaseElements/Common/ElementMenuItem";
export default {
name: "CommonElementMenu",
  components: {ElementMenuItem},
  props:{
    elementType:String,
    gridType:String,
    elementID:Number,
  },
  data(){
    return{
      items:{}
    }
  },
  methods:{
    loadContent(){
      let stf = {
        top:[
          {id:'add',icon:'Add.svg',text:'Add'},
        ],
        mid:[],
        bot:[
          {id:'delete',icon:'Delete.svg',text:'Delete'},
        ]
      }

      if(this.type === 'dashboard'){
        this.items = stf;
      }
      else {
        this.items = stf;
      }
    }
  },
  mounted() {
    this.loadContent();
  }
}
</script>

<style scoped lang="scss">
  .CommonElementMenu{
    display: flex;
    flex-direction: column;

    .TopRow{
      display: flex;
      flex-direction: row;
      padding-bottom: 20px;
    }

    .MidRow{
      display: flex;
      flex-direction: row;
      padding-bottom: 20px;
    }

    .BotRow{
      display: flex;
      flex-direction: row;
      padding-bottom: 20px;
    }

  }


</style>