<template>
<!--<div class="item">-->
  <div class="content">
    <h4 @click="onTitleClick" v-if="!showTitleInput">{{localMeta.title}}</h4>
    <input  ref="input"  :value="localMeta.title" v-else @focusout="onFocusOutOfTitleInput">
    <p @click="onStuffspaceClick">Enter</p>
  </div>
<!--</div>-->
</template>

<script>
export default {
  name: "GridItemStuffspace",
  props:{
    content:String,
    ID:Object,
  },
  data(){
    return{
       showSettings:false,
      showTitleInput:false,
      localMeta:{},
    }
  },
  methods:{
    onFocusOutOfTitleInput(e){
      this.localMeta.title = e.srcElement.value;
      this.$store.dispatch('setElementByKey',{
        type:'item',
        id:this.ID.itemID,
        key:'meta',
        val:this.localMeta
      })
      this.showTitleInput = false;
    },
    onTitleClick(){
      this.showTitleInput = true;
    },
    onStuffspaceClick(){
      this.$router.push({path:'/stuffspace',query:{id:this.content}});
    },
    createLocalMeta(){
      this.$store.dispatch('getElementByKey',{
        type:'item',
        id:this.ID.itemID,
        key:'meta'
      }).then(meta=>{
        let tmp = Object.assign({},meta);
        delete tmp.tags;
        this.localMeta = {
          tags:Array.from(meta.tags),
          ...tmp
        }
      })
    },
  },
  updated() {
    if(this.showTitleInput) this.$refs.input.focus()
  },
  mounted() {
    this.createLocalMeta();
  },
}
</script>

<style scoped lang="scss">

.content{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
//
//.item{
//  width: 100%;
//  height: 100%;
//}

h4{
  color: black;
  flex-grow: 1;
}

input{
  pointer-events: all;
  border: none;
  user-select: initial;
  font-family: Arial, sans-serif;
  display: block;
  box-sizing: border-box;
  font-size: 1em;
  color: black;
  text-align: center;
  //margin-top: 1.33em;
  //margin-bottom: 1.33em;
  //margin-left: 0;
  //margin-right: 0;
  font-weight: bold;
  &:focus{
    outline: none;
  }
}



</style>