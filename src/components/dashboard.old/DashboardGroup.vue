<template>
  <div class="dashboardGroup">
    <div class="dashboardGroupHeader">
      <slot name="dashboardGroupHeader"></slot>
    </div>
    <div class="dashboardGroupTasks">
      <slot name="dashboardGroupTasks"></slot>
    </div>
  </div>
</template>

<script>

import DashboardTask from "@/components/dashboard.old/DashboardTask";
import DashboardDrag from "@/components/dashboard.old/DashboardDrag";

export default {
  name: "DashboardGroup",
  props:{
    group:{
      type: Object,
      // required: true,
    }
  },
  components:{ DashboardTask, DashboardDrag},
  mounted() {
    // console.log(this.group)
  }

}
</script>

<style lang="scss" scoped>

.dashboardGroup{
  background-color: darkcyan;
  display: flex;
  flex-direction: column;
  padding: 10px;
  //padding-right: 10%;
  //margin: 10px;
  //width: 100%;
  //height: 100%;
  //filter: alpha(0.6);
  overflow: hidden;

  .dashboardGroupTasks{
    overflow: hidden;
    width: 100%;
    height: 100%;

      &:hover{
        //padding-right: 0;
        overflow-y: auto;
      }

  }

}

</style>