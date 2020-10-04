<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!-- new pizza -->
      <app-new-pizza></app-new-pizza>
    </div>
    <div class="col-sm-12 col-md-4">
      <h3 class="text-mutes my-5">菜单</h3>
      <table class="table">
        <thead class="table table-default">
          <tr>
            <th>品种</th>
            <th>尺寸</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.skuId">
          <tr>
            <td>{{item.skuName}}</td>
            <td>{{item.size}}</td>
            <td>
              <button class="btn btn-outline-danger btn-sm" @click.prevent='deleteData'>&times;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import NewPizza from './Newpizza.vue'
import axios from 'axios'
import index from '../../config/index'
export default {
  data(){
    return{
      //getMenuItems:{}
    }
  },
  components: {
    'app-new-pizza' : NewPizza
  },
  computed:{
    getMenuItems:{
      //在Vuex中获取数据
      get(){
        //return this.$store.state.menuItems
        return this.$store.getters.getMenuItems
      },
      set(){}
    },
  },
  created(){
     axios.get('/admin/sku/findAll').then(res=> {
          // console.log(res)
          if(res.status==200){
            return res.data
            //this.getMenuItems=res.data
          }
          else if(res.status==400){
            alert("添加失败")
          }
        })
        .then(data => {
          let menuArray = []
            for(let key in data){
              data[key].id = key
              menuArray.push(data[key])
            }
            //数据同步
            this.$store.commit('setMenuItems',menuArray)
        })
  },
  methods: {
    deleteData(item){
      // fetch("/admin/sku/deleteSkuBySkuId"+item.skuId+"/json",{
      //   method:"DELETE",
      //   headers:{
      //     'Content-type':'application/json'
      //   }
      // })
      // .then(res => console.log(res))
       axios.delete('/api/admin/sku/deleteSkuBySkuId',item.skuId).then(res => {
          if(res.status==200){
            this.$store.commit('removeMenusItems',item)
            alert("删除成功")
          }
          else if(res.status==400){
            alert("删除失败")
          }
        })
    }
  }
  // data () {
  //   return {
  //     name: 'Henry'
  //   }
  // },
  // beforeRouteEnter: (to, from, next) => {
  //   // alert('Hello' + this.name);
  //   // next();

  //   next (vm => {
  //     alert('Hello' + vm.name);
  //   })
  // },

  // beforeRouteLeave (to,from, next){ 
  //   if(confirm("确定离开吗？")){
  //     next();
  //   }else{
  //     next(false);
  //   }
  // }
}
</script>