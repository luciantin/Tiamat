<template>
  <div class="loginPage">
    <div class="login">
      <section class="content">
        <img src="@/assets/img/Rectangle.svg"/>
      </section>


      <section class="form">

        <div class="main">
          <div class="inputs">
            <InputField
                v-model="username"
                placeholder="username"
                title="Username"
                :is-ok="passwordCheck"
            />
            <InputField
                v-model="email"
                placeholder="Email"
                title="Email"
                :is-ok="emailCheck"
                type="email"
            />
            <InputField
                v-model="password"
                placeholder="password"
                title="Password"
                :is-ok="passwordCheck"
                type="password"
            />

            <p>{{errorMessage}}</p>
          </div>

          <Button class="buttonLogin" text="Sign Up" @buttonClick="onClickSubmit" />

        </div>

        <div class="links">
          <router-link class="link" to="/signup">Create an account</router-link>
          <router-link class="link" to="/signup">Forgot Password?</router-link>
        </div>

      </section>

    </div>
  </div>
</template>


<script>
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import {UserFactory} from "@/factory/userFactory/userFactory";
import {ElementsFactory} from "@/factory/elementsFactory/elementsFactory";
import {CreateNewDashboard} from "@/components/grid/ElementHelpers/elementCreate";

export default {
  components: {InputField, Button},
  data(){
    return{
      password:'',
      email:'',
      username:'',
      errorMessage:'    '
    }
  },
  methods:{
    onClickSubmit(){
      // console.log('asd');

      this.$store.dispatch('signup',{
        email:this.email,
        password:this.password
      }).then(()=>{ // signup succ., init db data for new user\
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
          pos:{w:1,h:3,x:1,y:1},
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
          let userData = new UserFactory().createUser(this.username,[newDashID]);
          this.$store.dispatch('setUser',userData);
          this.$router.push({path:'/dashboard',query:{id:newDashID}});
        })

      }).catch((error)=>{
        // console.log(error)
        this.errorMessage = error.message
      })

    },

    passwordCheck(val){
      return val.length >= 4;
    },
    emailCheck(val){
      let indexOfAt = val.indexOf('@');
      let indexOfDot = val.indexOf('.',indexOfAt);
      if(indexOfAt === -1 || indexOfDot === -1) return false;// nema ih
      if(indexOfDot-indexOfAt < 2) return false;
      if(indexOfDot === val.length -1) return false;

      else return true;
    },
  }
}
</script>


<style scoped lang="scss">
.loginPage{
  background: rgb(83,160,232);
  background: linear-gradient(239deg, rgba(83,160,232,1) 59%, rgba(255,255,255,1) 59%);
  width: 100vw;
  height: 100vh;

  .login{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding-top: 30vh;

    .content{
      flex-shrink: 1;
    }

    .form{

      .main{
        background: #FFFFFF;
        box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: end;
        min-width: 25vw;
        flex-shrink: 0;
        height: 40vh;


        p{
          text-align: center;
        }

        .inputs{
          display: flex;
          flex-direction: column;
          flex-grow: 20;
          justify-content: space-evenly;
          text-align: left;
        }

        .buttonLogin{
          border-radius: 0px 0px 18px 18px;
          //width: 22vw;
          align-self: end;
          flex-grow: 1;
          //min-width: 30vw;
          width: 100%;
        }
      }

      .links{
        margin-top: 20px;
        .link{
          text-decoration: none;
          color: white;
          margin-left: 20px;

          &:first-of-type{
            margin: 0;
            margin-right: 20px;
          }
        }
      }


    }
  }
}

</style>

