<template>
  <h1>Browse Dashboards</h1>
  <div class="browse">
    <div class="dashElem" v-for="id in this.localDashboardIDs" @click="onClickGotoNewDash(id)" >
      <p >{{id}}</p>
    </div>
    <div>
      <h2 @click="onClickCreateNewDash">Add</h2>
    </div>
  </div>
</template>

<script>
import {ElementsFactory} from "@/factory/elementsFactory/elementsFactory";
import {CreateNewDashboard} from "@/components/grid/ElementHelpers/elementCreate";
import {UserFactory} from "@/factory/userFactory/userFactory";

export default {
  name: "BrowseDashboards",
  data(){
    return{
      localDashboardIDs:[],
    }
  },
  methods:{
    onClickCreateNewDash(){
      let elFac = new ElementsFactory();


      let meta = elFac.createMeta({
        title:'New',
        description:'New',
        tags: ['New']
      })

      let gridData = elFac.createGridData({
        gridID : 'newDash',
        gridClass: 'dashboard',
        gridColNum:5,
        gridRowNum:5
      })

      let dashboard = elFac.createDashboard({stuffspaceID:[],containerID:[],meta:meta,gridData:gridData});

      let container = elFac.createContainer({
        groupID:[],
        pos:{w:1,h:1,x:1,y:1},
        innerGrid:{rows:1,cols:1},
        groupPos:{},
        meta:meta
      })

      let group = elFac.createGroup({
        sectionID:[],
        meta:meta
      })

      let section = elFac.createSection({
        type:'stuffspace',
        itemID:[],
        meta:meta
      });

      let stuffspaceItem = elFac.createItem({
        type:'stuffspace',
        content:'0', // OK, ID changes when a new stfsp is created
        meta:meta
      })

      let newDashData={
        dashboard: dashboard,
        container: container,
        group: group,
        section: section,
        item: stuffspaceItem,
      }
      CreateNewDashboard(newDashData).then(newDashID=>{

        // let userData = new UserFactory().createUser(this.username,[newDashID]);
        this.$store.dispatch('getUser').then((userData)=>{
          console.log(userData)
          userData.dashboardID = Array.from(userData.dashboardID)
          userData.dashboardID.push(newDashID)

          this.$store.dispatch('setUser',userData).then(()=>{
            this.getUserDashboardIDs();
          })
        })

        // this.$router.push({path:'/dashboard',query:{id:newDashID}});
      })
    },
    onClickGotoNewDash(id){
      this.$router.push({path:'/dashboard',query:{id:id}});
    },
    getUserDashboardIDs(){
      this.$store.dispatch('getUser').then(user=>{
        this.localDashboardIDs = Array.from(user['dashboardID']);
      })
    },

  },

  mounted() {
    this.getUserDashboardIDs()
  }
}
</script>

<style scoped lang="scss">

.browse{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .dashElem{
    width: 90%;
    background-color: #FFFFFF;
  }
}

</style>