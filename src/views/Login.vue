<template>

  <div v-if="loading" class="loading">
    <h1>LOADING</h1>
    <h1>LOADING</h1>
    <h1>LOADING</h1>
    <h1>LOADING</h1>
    <h1>LOADING</h1>
    <h1>LOADING</h1>
    <h1>LOADING</h1>
  </div>

  <div v-if="!loading" class="loginPage">
    <div class="login">
      <section class="content">
        <img src="@/assets/img/Rectangle.svg"/>
      </section>


      <section class="form">

        <div class="main">
          <div class="inputs">
<!--            <InputField-->
<!--                v-model="username"-->
<!--                placeholder="username"-->
<!--                title="Username"-->
<!--                :is-ok="passwordCheck"-->
<!--            />-->
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

          <Button class="buttonLogin" text="Sign In" @buttonClick="onClickSubmit" />

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
import {firebase} from '@/firebase/firebase'
import router from "@/router/routes";

export default {
  components: {InputField, Button},
  data(){
    return{
      password:'',
      email:'',
      loading:false,
      // username:'',
    }
  },
  methods:{
    onClickSubmit(){

      this.$store
          .dispatch('login',{
            email:this.email,
            password:this.password
          })
          .then((a)=>{
            // console.log('testestsetttetsetseet',a) // todo catch login error
            // this.$store.dispatch('initDB');
            this.sendUserToFirstDash();
          })
          .catch((error)=>{

          })
    },
    sendUserToFirstDash(){
      this.loading = true;
      this.$store.dispatch('getUser').then(a=>{
        this.$router.push({path:'/dashboard',query:{id:a.dashboardID[0]}}); // open dashboard component with first dash id
      })
    },
    passwordCheck(val){
      return val.length >= 4;
    }
  },
  beforeMount() {
    // console.log(this.$store.getters.isAuth)
    if(this.$store.getters.isAuth) this.sendUserToFirstDash();
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

