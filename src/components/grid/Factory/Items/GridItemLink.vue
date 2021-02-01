<template>
  <!--  <p>text {{content}}</p>-->
<!--  <p  @click="onTextClick" v-if="showText">{{localText}}</p>-->
  <p @click="onTextClick" v-if="showDomainName">{{domainName}}</p>
  <textarea  ref="input"  :value="localText" v-if="showTextInput" @focusout="onFocusOutOfTextInput"> </textarea>
  <div class="flexRowSpaceBtw">
    <DeleteItem :secID="Number(this.ID.sectionID)" :itemID="Number(this.ID.itemID)" @onItemDelete="$emit('onItemDelete',$event)" :style="{'visibility':'hidden'}"  />
    <a  ref="link" :href="localText" target="_blank" rel="noopener noreferrer">GO</a>
    <DeleteItem :secID="Number(this.ID.sectionID)" :itemID="Number(this.ID.itemID)" @onItemDelete="$emit('onItemDelete',$event)"  />
  </div>
</template>

<script>


import DeleteItem from "@/components/grid/GridBaseElements/Common/DeleteItem";
export default {
  name: "GridItemLink",
  components: {DeleteItem},
  props:{
    content:String,
    ID:Object,
  },
  data(){
    return{
      localText:'Empty',
      showTextInput: false,
      domainName:''
    }
  },
  methods:{
    onTextClick(){
      this.showTextInput = true;
    },
    onFocusOutOfTextInput(e){
      this.localText = e.srcElement.value;
      this.$store.dispatch('setElementByKey',{
        type:'item',
        id:this.ID.itemID,
        val:this.localText,
        key:'content'
      })
      this.updateDomainName();
      this.showTextInput = false;
    },
    updateDomainName(){
      if(this.localText === 'Empty') {
        this.domainName = 'Empty';
        return ;
      }
      this.$refs.link.href = this.localText;
      this.domainName = this.$refs.link.hostname
    }
  },
  mounted() {
    if(this.content.length !== 0) this.localText = String(this.content)
    this.updateDomainName();
  },
  computed:{
    showText(){
      if(this.localText.length > 0) return false;
      else return !this.showTextInput;
    },
    showDomainName(){
      if(this.showText === false && this.showTextInput === false) return true;
      // if() return true;
      return false;
    },
  },
}
</script>

<style scoped lang="scss">


a{
  text-decoration: none;
  color: black;
  &:hover{
    color: #2c3e50;
  }
}

p{
  color: black;
  text-align: center;
  min-height: 1.4em;
}

.flexRowSpaceBtw{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

textarea{
  font-family: Arial, sans-serif;
  font-size: 100%;
  height: 1.4em;
  /*pointer-events: all !important;*/
  /*user-select: all !important;*/
  /*user-modify: all;*/
  user-select: initial;
}

</style>
