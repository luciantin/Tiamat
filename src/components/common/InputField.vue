<template>
  <div class="inputField">

    <h2>{{title}}</h2>

   <div class="container">
     <input
         v-model="value"
         :placeholder="placeholder"
         :type="type"
     >

     <img v-if="isOk(value)" src="@/assets/img/forms/ok.svg" />
     <img v-else src="@/assets/img/forms/no.svg" />
   </div>

  </div>
</template>

<script>
export default {
  name: "InputField",
  props:['modelValue','type','placeholder','isOk','title'],
  emits:['update:modelValue'],
  computed: {
    value:{
      get(){
        return this.modelValue;
      },
      set(value){
        this.$emit('update:modelValue',value);
      }
    }
  }
}
</script>

<style scoped lang="scss">

  .inputField{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 0px;

    h2{
      grid-area: 1 / 1 / 2 / 2;
      text-align: right;
    }

    .container{
      display: flex;
      flex-direction: row;
      grid-area: 1 / 2 / NaN / NaN;

      img{
        padding: 0px 5px;
      }
    }
  }

</style>