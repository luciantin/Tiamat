<template>
  <div  class="groupMenu" @mouseenter="mouseEnterMenu" @mouseleave="mouseLeaveMenu" >
    <CommonElementMenu v-if="isHovered" class="CommonMenuElement">
      <template v-slot:TopRow>

      </template>
      <template v-slot:MidRow >

      </template>
      <template v-slot:BotRow >

      </template>
    </CommonElementMenu>
  </div>
</template>

<script>
import CommonElementMenu from "@/components/grid/GridBaseElements/Common/CommonElementMenu";
import ElementMenuItem from "@/components/grid/GridBaseElements/Common/ElementMenuItem";
export default {
  name: "GroupMenu",
  components: {ElementMenuItem, CommonElementMenu},
  props:{
    type:String,
    groupID: String,
  },
  data(){
    return{
      isHovered:true,
      items:{},
    }
  },
  methods:{
    mouseEnterMenu(){
      // this.isHovered = true;
      console.log(this.groupID)
    },
    mouseLeaveMenu(){
      // this.isHovered = false;
    },
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
    },
  },
  mounted() {
    this.loadContent();
  }
}
</script>

<style scoped lang="scss">
//.groupMenu{
//  width: 1em;
//  height: 1em;
//  background-color: chartreuse;

  .CommonMenuElement{
    //display: block;
    //z-index: 10;
    //position: absolute;
    //background-color: black;
    //top: 5%;
    //top: -20px;
    //width: 50px;
    //height: 50px;
  }
//}


</style>