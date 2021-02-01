<template>

  <div class="imageItem">
    <div class="leftCol">
      <input ref="fileInput" id="fileInput" type="file">
      <div class="secondRow">
        <button @click="onFromFileSubmit">Submit</button>
        <DeleteItem :secID="Number(this.ID.sectionID)" :itemID="Number(this.ID.itemID)" @onItemDelete="$emit('onItemDelete',$event)"  />
      </div>
    </div>
    <div class="rightCol">
      <img :src="blobData">
    </div>
  </div>

</template>

<script>
import Button from "@/components/common/Button";
import DeleteItem from "@/components/grid/GridBaseElements/Common/DeleteItem";
export default {
  name: "GridItemImage",
  components: {Button,DeleteItem},
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
      // console.log(this.$refs.fileInput)
      let reader = new FileReader();
      let file = this.$refs.fileInput.files[0]
      this.type = file.type

      reader.onload = (a)=>{
        // console.log(a)
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
    // console.log()
    this.$store.dispatch('getFileURL',{filename:String(this.content)}).then(a=>this.blobData=a)
    // this.blobData = String(this.content)
  }
}
</script>

<style scoped lang="scss">
.imageItem{
  display: flex;
  flex-direction: column;

.leftCol{
  display: flex;
  flex-direction: column;
  flex-grow: 5;
  justify-content: center;

  .secondRow{
    display: flex;
    flex-direction: row;
    justify-content: center;

  }
}

.rightCol{
  display: flex;
  flex-direction: row;
  flex-grow: 0;
}

}
//
//input[type='file'] {
//  color: transparent;
//}
img{
  width: 100%;
}

</style>
