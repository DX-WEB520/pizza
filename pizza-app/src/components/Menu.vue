<template>
  <div class="row">
    <!-- 菜单 -->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>品种</th>
            <th>尺寸</th>
            <th>价格</th>
            <th>加入</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key='item.skuName'>
          <tr>
            <td><strong>{{item.skuName}}</strong></td>
            <td>{{item.size}}</td>
            <td>{{item.price}}</td>
            <td>
              <button @click="addToBasket(item,getMenuItems)" class="btn btn-sm btn-outline-success">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 购物车 -->
    <div class="col-sm-12 col-md-4">
      <div v-if=" baskets.length > 0 ">
        <table class="table">
          <thead class="thead-default">
            <tr>
              <th>数量</th>  
              <th>品种</th>
              <th>价格</th>
            </tr>
          </thead>
          <tbody v-for="item in baskets" :key="item.skuName">
            <tr>
              <td>
                <button @click="decreaseQuantity(item)" class="btn btn-sm">-</button>
                <span>{{item.quantity}}</span>
                <button @click="increaseQuantity(item)" class="btn btn-sm">+</button>
              </td>
              <td>{{item.skuName}}</td>
              <td>{{item.price * item.quantity}}</td>
            </tr>
          </tbody>
        </table>
        <p>总价:{{total+"RMB"}} </p>
        <button class="btn btn-success btn-block">提交</button>
      </div>
      <div v-else>
        {{basketText}}
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data(){
    return{
      baskets:[],
      basketText:'购物车没有任何商品',
      //getMenuItems:{
      
        // 3: {
        //   'skuName': '夏威夷pizza',
        //   'description': '众多人的默认选择',
        //     'size': 9,
        //     'price': 36
        //   },
        //    4: {
        //   'skuName': '夏威夷pizza',
        //   'description': '众多人的默认选择',
        //     'size': 9,
        //     'price': 36
        //   },
        //    5: {
        //   'skuName': '夏威夷pizza',
        //   'description': '众多人的默认选择',
        //     'size': 9,
        //     'price': 36
        //   }
      //}
    }
  },
  computed: {
    getMenuItems(){
      //在Vuex中获取数据
      //return this.$store.state.menuItems
      return this.$store.getters.getMenuItems
    },
    total(){
      let totalCost = 0
      for(let index in this.baskets){
        let indevidualItem = this.baskets[index]
        totalCost += indevidualItem.quantity * indevidualItem.price
      }
      return totalCost
    }
  },
  created(){
    this.fetchData()
  },
  methods: {
    fetchData(){
      // fetch("https://pizza-app-9e508.firebaseio.com/menu.json")
      // .then(res => {
      //   return res.json()
      // })
      // .then(data => {
      //   this.getMenuItems = data
      // })

      axios.get("/admin/sku/findAll")
      .then(res => this.$store.commit("setMenuItems" , res.data))

      // this.http.get("menu.json")
      // .then(res => this.getMenuItems = res.data)

      // this.http.get("menu.json")
      // .then(res => this.$store.commit("setMenuItems",res.data))
    },
    addToBasket(item,option){  
      let basket = {
        skuName: item.skuName,
        size: item.size,
        price: item.price,
        quantity: 1
      }
      if(this.baskets.length > 0){
        let result = this.baskets.filter( basket => {
          return (basket.skuName === item.skuName && basket.size === item.size)
        })

        if(result != null && result.length > 0){
          result[0].quantity++
        }
        else{
          this.baskets.push(basket)
        }
      }else{
        this.baskets.push(basket)
      }
    },
    decreaseQuantity(item){
      item.quantity--;
      if(item.quantity <= 0){
        this.removeFromBasket(item);
      }
    },
    increaseQuantity(item){
      item.quantity++;
    },
    removeFromBasket(item){
      this.baskets.splice(this.baskets.indexOf(item),1)
    }
  }
}
</script>