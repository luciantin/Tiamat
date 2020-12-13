<template>
  <div class="dashboardTask">
    <p>{{taskId}}</p>
  </div>
</template>

<script>
export default {
  name: "DashboardTask",
  props:{
    task:{
      type: Object,
      // required: true,
    },
    taskId:{
      type: String,
      // required: true,
    },
  },
  mounted() {
    // console.log("TASK",this.task)
  }
}
</script>

<style scoped>
  .dashboardTask{
    background-color: #8095ad;
    margin-top: 3px;
  }

</style>