<template>
  <form>
      <h3 class="text-muted my-5">添加新的Pizza</h3>
      <div class="form-group row">
        <label class="col-sm-1">品种</label>
        <div class="col-sm-11">
          <input type="text" class="form-control" v-model="skuName">
        </div>
      </div>
      
      <div class="form-group row">
          <label class="col-sm-1">描述</label>
          <div class="col-sm-11">
              <textarea  rows="5" class="form-control" v-model="description"></textarea>
          </div>
      </div>
      
      <div class="form-group row">
        <label class="col-sm-1">尺寸</label>
         <div class="col-sm-11">
            <input type="text" class="form-control" v-model="size">
         </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-1">价格</label>
        <div class="col-sm-11">
          <input type="text" class="form-control" v-model="price">
        </div>
      </div>

      <div class="form-group row">
        <button @click.prevent="addMenuItem" class="btn btn-success btn-block">添加</button>
      </div>

  </form>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
          skuName:"",
          description:"",
          size:"",
          price:""
        }
    },
    methods: {
      addMenuItem(){
        let data = {
          skuName:this.skuName,
          description:this.description,
          size:this.size,
          price:this.price
          }

        //axios vue-resource es6 fetch
        // fetch("/admin/sku/saveSku",{
        //   method: 'POST',
        //   headers: {
        //     "Content-type":"application/json"
        //   },
        //   body:JSON.stringify(data)
        // })
        // .then(res => res.json())
        // .then(data => console.log(data))
        // .catch(err => console.log(err))

      //   this.http.post("/admin/sku/saveSku",data)
      //   .then(res => {
      //     console.log(res)
      //     this.$router.push({name:"menuLink"})
      //     })
      // }
      var qs = require('querystring')
      axios.post('/admin/sku/saveSku',qs.stringify(data)).then(res => {
          if(res.status==200){
            this.$store.commit("pushToMenuItems",data)
            alert("添加成功")
          }
          else if(res.status==400){
            alert("添加失败")
          }
        })
      }
    }
}
</script>