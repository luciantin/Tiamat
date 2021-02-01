<template>
<!--  <p>text {{content}}</p>-->
  <div class="textItem">
    <div class="leftCol">
      <div @click="onTextClick" v-if="!showTextInput">
        <p v-for="line in localText.split('\n')">{{line}}</p>
      </div>
      <textarea  ref="input" :rows="numOfNewlines" :value="localText" v-else @focusout="onFocusOutOfTextInput"> </textarea>
    </div>
    <div class="rightCol">
      <DeleteItem :secID="Number(this.ID.sectionID)" :itemID="Number(this.ID.itemID)" @onItemDelete="$emit('onItemDelete',$event)"  />
    </div>
  </div>


</template>

<script>
import DeleteItem from "@/components/grid/GridBaseElements/Common/DeleteItem";
export default {
name: "GridItemText",
  components: {DeleteItem},
  props:{
    content:String,
    ID:Object,
  },
  emits:['onItemDelete',],
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
  },
  computed:{
    numOfNewlines(){
      return this.localText.split('\n').length
    }
  }
}
</script>

<style scoped lang="scss">

.textItem{
  display: flex;
  flex-direction: row;

  .leftCol{
    display: flex;
    flex-direction: column;
    flex-grow: 5;
  }

  .rightCol{
    display: flex;
    flex-direction: column;
    flex-grow: 0;
  }

}

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