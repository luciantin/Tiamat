<template>
  <div class="group" @mouseleave="onMouseLeaveGroup">

    <div class="groupHeader">
      <div class="Left">
        <slot name="GroupDrag"></slot>
      </div>
      <div class="Mid">
        <p>Group : {{title}}</p>
      </div>
      <div class="Right">
        <div class="GroupMenuButton" @click="onGroupMenuClick" ></div>
      </div>
    </div>

      <Package
          v-if="!showSettings"
          class="groupItems"
          v-for="(id,index) in group.sectionID"
          :groupID="GroupID"
          :sectionID="id"
          :key="index"
      />

      <CommonElementMenu
          v-else
          class="GroupSettings"
          :elementType="'group'"
          :elementID="GroupID"
          :gridType="GridType"
      />

  </div>
</template>

<script>

import Package from "@/components/grid/GridBaseElements/Package/Package";
import CommonElementMenu from "@/components/grid/GridBaseElements/Common/CommonElementMenu";

export default {
  name: "Group",
  components: {CommonElementMenu, Package},
  props:{
    group:Object,
    title:String,
    GroupID:String,
    GridType:String,
  },
  data(){
    return{
      showSettings:false,
    }
  },
  methods:{
    onGroupMenuClick(){
      this.showSettings = true;
    },
    onMouseLeaveGroup(){
      this.showSettings = false;
    }
  },
  mounted() {
    console.log(this.group,this.GroupID)
  }
}
</script>

<style lang="scss" scoped>

.group{
  background-color: darkcyan;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: hidden;

  .groupHeader{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    &:hover{
      .Left{
        visibility: visible;
      }
      .Right{
        visibility: visible;
      }
    }

    .Left{
      visibility: hidden;
      justify-self: left;
      grid-area: 1 / 1 / 2 / 2;
    }
    .Mid{
      justify-self: center;
      grid-area: 1 / 2 / 2 / 3;
    }
    .Right{
      visibility: hidden;
      justify-self: right;
      grid-area: 1 / 3 / 2 / 4;
    }
  }

  .groupItems{
    overflow: hidden;
    width: 100%;
    height: 100%;

    &:hover{
      overflow-y: auto;
    }
  }

  .GroupMenuButton{
    width: 1em;
    height: 1em;
    background-color: chartreuse;
  }

}

</style>