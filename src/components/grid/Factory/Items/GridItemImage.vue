<template>

  <input ref="fileInput" type="file">
  <button @click="onFromFileSubmit">Submit</button>
  <img :src="blobData">

</template>

<script>
import Button from "@/components/common/Button";
export default {
  name: "GridItemImage",
  components: {Button},
  props:{
    content:String,
    ID:Object,
  },
  data(){
    return{
      blobData:null,
      type:'',
    }
  },
  methods:{
    onFromFileSubmit(){
      console.log(this.$refs.fileInput)
      let reader = new FileReader();
      let file = this.$refs.fileInput.files[0]
      this.type = file.type

      reader.onload = (a)=>{
        console.log(a)
        this.blobData = a.target.result;
        // console.log(this.blobData)

      }

      reader.readAsDataURL(file)

      this.$store.dispatch('setElementByKey',{
        type:'item',
        id:this.ID.itemID,
        key:'content',
        val:file.name
      })

      this.$store.dispatch('putFile',{
        filename:file.name,
        file:file,
      })

    }

  },
  mounted() {
    if(String(this.content) === '') return;
    console.log(this.$store.dispatch('getFileURL',{filename:String(this.content)}).then(a=>this.blobData=a))
    // this.blobData = String(this.content)
  }
}
</script>

<style scoped>

img{
  width: 100%;
}

</style>
