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
                :is-ok="passwordCheck"
                type="email"
            />
            <InputField
                v-model="password"
                placeholder="password"
                title="Password"
                :is-ok="passwordCheck"
                type="password"
            />
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

export default {
  components: {InputField, Button},
  data(){
    return{
      password:'',
      email:'',
      username:'',
    }
  },
  methods:{
    onClickSubmit(){
      // console.log('asd');

      this.$store.dispatch('signup',{
        email:this.email,
        password:this.password
      }).then(()=>{ // signup succ., init db data for new user
        let userData = new UserFactory().createUser(this.username,[0]);
        let elFac = new ElementsFactory();

        let stfID = [0];
        let cntID = [0];
        let meta = elFac.createMeta({
          title:'Dash',
          description:'new Dash',
          tags: ['Dash']
        })
        let GridData = elFac.createGridData({
          gridID : 'newDash',
          gridClass: 'dashboard',
          gridColNum:5,
          gridRowNum:5
        })

        let firstDash = elFac.createDashboard({stuffspaceID:stfID,containerID:cntID,meta:meta,gridData:GridData});
        let firstCnt = elFac.createContainer({
          groupID:[0,1],
          pos:{w:1,h:1,x:1,y:1},
          innerGrid:{rows:2,cols:2},
          groupPos:{
            '0':{w:1,h:1,x:0,y:0},
            '1':{w:1,h:1,x:1,y:0}
          },
          meta:meta
        })
        let grpOne = elFac.createGroup({
          sectionID:[0],
          meta:meta
        })
        let grpTwo = elFac.createGroup({
          sectionID:[1],
          meta:meta
        })

        // this.$store.dispatch('initDB');
        this.$store.dispatch('setUser',userData);
        this.$store.dispatch('setElement',{
          type:'dashboard',
          id:0,
          val:firstDash
        })
        this.$store.dispatch('setElement',{
          type:'container',
          id:0,
          val:firstCnt
        })
        this.$store.dispatch('setElement',{
          type:'group',
          id:0,
          val:grpOne
        })
        this.$store.dispatch('setElement',{
          type:'group',
          id:1,
          val:grpTwo
        })

        this.$router.push({path:'/dashboard',query:{id:0}});

      }).catch((error)=>{

      })

    },

    passwordCheck(val){
      return val.length >= 4;
    }
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

