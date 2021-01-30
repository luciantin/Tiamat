<template>
  <!--  <p>text {{content}}</p>-->
  <div class="checkItem">
    <input class="checkbox" type="checkbox" :checked="localChecked" @click="onCheckboxClick">
   <div class="checkText" @click="onTextClick">
     <p  v-if="!showTextInput">{{localText}}</p>
     <input  ref="input"  :value="localText" v-else @focusout="onFocusOutOfTextInput">
   </div>
  </div>


</template>

<script>
export default {
  name: "GridItemCheckbox",
  props:{
    ID:Object,
  },
  data(){
    return{
      localText:'',
      localChecked:false,
      showTextInput: false,
    }
  },
  methods:{
    onTextClick(){
      this.showTextInput = true;
    },
    onFocusOutOfTextInput(e){
      this.localText = e.srcElement.value;
      this.showTextInput = false;
      this.UpdateContent();
    },

    createLocalItemData(id){
      this.localText = '';
      this.localChecked = false;

      this.$store.dispatch('getElement', {
        type: 'item',
        id: id,
      }).then(item => {
        if(item.type === 'checkbox' && item.content === ''){
          item.content = {}
          item.content.checked = false;
          item.content.text  = '';
        }
          this.localChecked = Boolean(item.content.checked);
          this.localText = String(item.content.text);
        })
    },

    onCheckboxClick(){
      this.localChecked = !this.localChecked;
      this.UpdateContent();
    },

    UpdateContent(){
      let dat = {
        checked:this.localChecked,
        text: this.localText,
      }

      this.$store.dispatch('setElementByKey',{
        type:'item',
        id:this.ID.itemID,
        val:dat,
        key:'content'
      })
    }

  },
  mounted() {
    this.createLocalItemData(this.ID.itemID);
  }
}
</script>

<style scoped lang="scss">

.checkItem{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 1.4em;
  overflow: hidden;

  .checkbox{
    margin-left: 5px;
  }

  .checkText{
    display: flex;
    flex-direction: row;
    justify-content: start;
    //background-color: #2c3e50;
    width: 95%;
    margin-left: 5px;
    padding-left: 5px;

    input{
      font-family: Arial, sans-serif;
      font-size: 100%;
      width: 95%;
      pointer-events: all;
      border: none;
      user-select: initial;

      &:focus{
        outline: none;
      }
    }
  }
}

p{
  margin-right: 5px;
  text-align: start;
  min-height: 1.2em;
  color: black;
}

textarea{
  font-family: Arial, sans-serif;
  font-size: 100%;
}

</style>