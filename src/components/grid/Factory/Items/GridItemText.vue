<template>
<!--  <p>text {{content}}</p>-->
  <p @click="onTextClick" v-if="!showTextInput">{{localText}}</p>
  <textarea  ref="input"  :value="localText" v-else @focusout="onFocusOutOfTextInput"> </textarea>


</template>

<script>
export default {
name: "GridItemText",
  props:{
    content:String,
    ID:Object,
  },
  data(){
    return{
      localText:'',
      showTextInput: false,
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

      this.showTextInput = false;
    }
  },
  mounted() {
    this.localText = String(this.content)
  }
}
</script>

<style scoped>

p{
  color: black;
  text-align: start;
  min-height: 1.4em;
}

textarea{
  font-family: Arial, sans-serif;
  font-size: 100%;
  user-select: initial;
}

</style>