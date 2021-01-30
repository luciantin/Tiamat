<template>
  <div class="main">
    <h1 class="heading">Browse Dashboards</h1>
    <div class="underline"></div>
    <div class="browse">
      <div class="browseElem" v-for="id in this.localDashboardIDs" @click="onClickGotoNewDash(id)" >
        <h4 >Dashboard : {{id}}</h4>
        <div v-if="this.localDashboardIDs.length > 1"  @mousedown="onRemoveDash(id)" >
          <img :src="require('@/assets/img/GridMenu/Delete.svg')"/>
        </div>
      </div>
      <div>
        <h2 class="addButton" @click="onClickCreateNewDash">Add</h2>
      </div>
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
    onRemoveDash(id){
      console.log(this.localDashboardIDs,id)
      this.$store.dispatch('getUser').then(user=>{
        this.localDashboardIDs.splice(this.localDashboardIDs.indexOf(id),1)
        user.dashboardID = this.localDashboardIDs;
        this.$store.dispatch('setUser',user).then(()=>{
          this.getUserDashboardIDs()
        })
      })
    },
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
      let stuffspace = elFac.createStuffspace({containerID:[],meta:meta,gridData:gridData})

      let container = elFac.createContainer({
        groupID:[],
        pos:{w:1,h:1,x:1,y:1},
        innerGrid:{rows:1,cols:1},
        groupPos:{},
        meta:meta
      })

      let stfContainer = elFac.createContainer({
        groupID:[],
        pos:{w:1,h:3,x:1,y:1},
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
        stuffspace:stuffspace,
        stfContainer: stfContainer,
      }
      CreateNewDashboard(newDashData).then(newDashID=>{

        // let userData = new UserFactory().createUser(this.username,[newDashID]);
        this.$store.dispatch('getUser').then((userData)=>{
          // console.log(userData)
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

.main{
  //display: flex;
  //flex-direction: column;
  //justify-content: center;
  //align-items: center;
  margin-top: 20px;
  padding: 0px 20px;

  .heading{
    color: #fff;
  }

  .underline{
    margin: 0 auto;
    width: 90%;
    background-color: #FFFFFF;
    height: 2px;
    margin-bottom: 20px;
  }

  .browse{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .browseElem{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 4px 0px;
    margin-top: 5px;
    width: 90%;
    background-color: #FFFFFF;

    &:hover{
      box-shadow: inset 4px 0px 4px rgba(0, 0, 0, 0.25);;
    }
  }
  .addButton{
    //width: 90%;
    margin-top: 10px;
    padding: 4px 20px;
    background-color: #2c3e50;
    color: #FFFFFF;

    &:hover{
      box-shadow: inset 4px 0px 4px rgba(0, 0, 0, 0.25);;
    }
  }
}

</style>