<template>
  <div class="dashboardContainer">
    <div class="dashboardContainerHeaderFlex">
      <slot name="dashboardContainerHeader"></slot>
    </div>
    <div
        class="dashboardContainerGroups"
        :style="{
          gridTemplateRows: makeGridByRepeat(this.groupGridRowCount),
          gridTemplateColumns: makeGridByRepeat(this.groupGridColCount),
        }"
    >
      <slot name="dashboardContainerGroups"></slot>
    </div>
  </div>
</template>

<script>

import DashboardGroup from "@/components/dashboard/DashboardGroup";

export default {
  name: "DashboardContainer",
  components:{DashboardGroup},
  props:{
    groupGridColCount: {
      type: Number
    },
    groupGridRowCount: {
      type: Number
    }
    // data: {
    //   type: Object,
    //   // required: true
    // },
  },
  methods:{
    // getTasks(group){
    //   let taskList = [];
    //   let res = {}, keyB;
    //   // console.log(group)
    //   taskList.push(group.tasks)
    //   taskList = taskList.flat();
    //   for( keyB in this.data.tasks) if(taskList.includes(keyB)) res[keyB] = this.data.tasks[keyB];
    //   // console.table(res)
    //   return res;
    // },
    makeGridByRepeat(num){
      let str = '';
      for(let i = 0; i< num; i++) str += '1fr ';
      return str;
    },
  },
  mounted() {
    // console.log(this.data)
  }
}
</script>

<style lang="scss" scoped>

.dashboardContainer {
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #2c3e50;
  //overflow: scroll;
  overflow: hidden;
  //margin-right: calc(100vw - 100%);
  &:hover{
    //overflow-y: scroll;
  }
  //
  //.dashboardContainerHeaderFlex{
  //
  //}

  .dashboardContainerGroups{
    display: grid;
    min-height: 40px;
    min-width: 40px;
    //padding: 10px;
    //grid-template-columns: auto;
    //grid-template-rows: auto;
    width: 100%;
    height: 100%;
    grid-gap: 10px;
    padding: 5px 5px 10px 5px;
    overflow: hidden;

    &:hover{
      overflow-y: auto;

    }
  }


}

</style>