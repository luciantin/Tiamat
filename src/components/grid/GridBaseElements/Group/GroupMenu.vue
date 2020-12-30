<template>
  <div  class="groupMenu" @mouseenter="mouseEnterMenu" @mouseleave="mouseLeaveMenu">
  </div>
    <CommonElementMenu>
      <template slot="TopRow">
        <ElementMenuItem v-for="(item,key) of items['top']" :key="key" :icon="item.icon" :text="item.text" :id="item.id" />
      </template>
      <template slot="MidRow">
        <ElementMenuItem v-for="(item,key) in items['mid']" :key="key" :icon="item.icon" :text="item.text" :id="item.id" />
      </template>
      <template slot="BotRow">
        <ElementMenuItem v-for="(item,key) in items['bot']" :key="key" :icon="item.icon" :text="item.text" :id="item.id" />
      </template>
    </CommonElementMenu>
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
      isHovered:false,
      items:{},
    }
  },
  methods:{
    mouseEnterMenu(){
      this.isHovered = true;
      console.log(this.groupID)
    },
    mouseLeaveMenu(){
      this.isHovered = false;
    },
    loadContent(){
      let stf = {
        top:[
          {id:'add',icon:'@/assets/img/GridMenu/Add.svg',text:'Add'},
        ],
        mid:[],
        bot:[
          {id:'delete',icon:'@/assets/img/GridMenu/Delete.svg',text:'Delete'},
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

<style scoped>
.groupMenu{
  width: 1em;
  height: 1em;
  background-color: chartreuse;
}
</style>