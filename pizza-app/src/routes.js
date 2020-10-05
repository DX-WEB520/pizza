import Home from './components/Home.vue'
import Admin from './components/Admin.vue'
import Menu from './components/Menu.vue'
import About from './components/about/About.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

//二级路由
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'

//三级路由
import Personname from './components/about/contact/Personname'
import Phone from './components/about/contact/Phone'


export const routes = [   //前面加export是为了把routes进行公开
    {path:'/',name:'homeLink',components:
      {
        default: Home,
        'orderingGuide': OrderingGuide,
        'delivery':Delivery,
        'history':History
      }
    },
    {path:'/about',redirect:'/about/contact',component:About,children:[
      {path:'/about/contact',name:'contactLink',redirect:'/phone',component:Contact,children:[
        {path:'/phone',name:'phoneNumber',component:Phone},
        {path:'/personName',name:'personName',component:Personname}
      ]},
      {path:'/history',name:'historyLink',component:History},
      {path:'/delivery',name:'deliveryLink',component:Delivery},
      {path:'/orderingGuide',name:'orderingGuideLink',component:OrderingGuide}
    ]},
    {path:'/login',name:'loginLink',component:Login},
    {path:'/menu',name:'menuLink',component:Menu},
    {path:'/register',name:'registerLink',component:Register},
    {path:'/admin',component:Admin,
        beforeEnter:(to ,from ,next) => {
        //路由独享守卫
        //alert('非登录状态，不能访问此页面！');
        //next(false);
        //判断store.gettes.isLogin === false
        if(to.path == '/login' || to.path == '/register'){
          next();
        }else{
          alert('您还没有登录，请先登录！');
          next('/login');
        }
        }
   },
    {path:'*',redirect:'/'}
  ]