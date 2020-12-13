<template>
  <div id="dashboard">
    <h1>TERST</h1>
    <Grid
        :content="content"
        :containers="containers"
        :groups="groups"
        :gridData="gridData"
    />
  </div>
</template>
<script>
import Grid from "@/components/grid/Grid";
export default {
  name:'Dashboard',
  components: {Grid},
  props:{

  },
  data(){
    return{
      gridData:{ // podaci o glavnom gridu, dashbordu
        gridID:'dash-01',
        gridClass: 'dashboard',
        dashboardTarget:'', //== document.getElemetById(GridData.gridID)
        grid:{top:0,left:0,width:0,height:0,x:0,y:0}, // not used
        gridColNum:6,
        gridRowNum:6,
      },
      /*  TASKS
          A task can be.
      */
      content:{
        'tsk-1':{title:'Task 1',data:{text:'Hi, I\'m task 1'},attributes:{completed:false,},type:'text',subtasks:[]},
        'tsk-2':{title:'Task 2',data:{text:'Hi, I\'m task 2'},attributes:{completed:true, },type:'text',subtasks:[]},
        'tsk-3':{title:'Task 3',data:{text:'Hi, I\'m task 3'},attributes:{completed:false,},type:'text',subtasks:[]},
        'tsk-4':{title:'Task 4',data:{text:'Hi, I\'m task 4'},attributes:{completed:false,},type:'text',subtasks:[]},
        'tsk-5':{title:'Task 5',data:{text:'Hi, I\'m task 5'},attributes:{completed:false,},type:'text',subtasks:[]},
        'tsk-6':{title:'Task 6',data:{text:'Hi, I\'m task 6'},attributes:{completed:false,},type:'text',subtasks:[]},
      },
      /*  GROUPS
          Groups hold tasks, they can be moved inside containers
          A group is completed when all the tasks are completed ?
       */
      groups:{
        'grp-1':{title:'Group 1',attributes:{completed:false,locked:false,title:false,},items:['tsk-1'],},
        'grp-2':{title:'Group 2',attributes:{completed:false,locked:false,title:true,},items:['tsk-4'],},
        'grp-3':{title:'Group 3',attributes:{completed:false,locked:false,title:true,},items:['tsk-3'],},
        'grp-4':{title:'Group 4',attributes:{completed:false,locked:false,title:true,},items:['tsk-5'],},
        'grp-5':{title:'Group 5',attributes:{completed:false,locked:false,title:true,},items:['tsk-6'],},
      },
      /*  CONTAINERS
          Containers hold groups, they can be resized, moved, etc.
       */
      containers:{
        'cnt-1':{
          title:'Container 1',
          groups:['grp-1'],
          pos:{w:1,h:4,x:4,y:3},
          innerGrid:{rows: 1,cols: 1},
          groupPlaceholderPos:{w:1,h:1,x:1,y:1},
          groupPos:{
            'grp-1':{w:1,h:1,x:1,y:1},
          }},
        'cnt-2':{
          title:'Container 1',
          groups:['grp-2'],
          pos:{w:1,h:1,x:1,y:3},
          innerGrid:{rows: 1,cols: 1},
          groupPlaceholderPos:{w:1,h:1,x:1,y:1},
          groupPos:{
            'grp-2':{w:1,h:1,x:1,y:1},
          }},
        'cnt-3':{
          title:'Container 1',
          groups:['grp-4'],
          pos:{w:1,h:1,x:1,y:1},
          innerGrid:{rows: 1,cols: 1},
          groupPlaceholderPos:{w:1,h:1,x:1,y:1},
          groupPos:{
            'grp-4':{w:1,h:1,x:1,y:1},
          }},
        'cnt-4':{
          title:'Container 1',
          groups:['grp-5','grp-2','grp-1'],
          pos:{w:2,h:2,x:3,y:1},
          innerGrid:{rows: 3,cols: 1},
          groupPlaceholderPos:{w:1,h:1,x:1,y:1},
          groupPos:{
            'grp-2':{w:2,h:1,x:1,y:1},
            'grp-5':{w:1,h:1,x:1,y:2},
            'grp-1':{w:1,h:1,x:1,y:3},
          }},
      },
    }
  }

}
</script>


<style scoped lang="scss" >



</style>
