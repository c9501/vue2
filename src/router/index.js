import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from "@/store"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/index',
    component: HomeView,
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import(/* webpackChunkName: "about" */ '../views/index.vue')
      },{
        path: '/member',
        name: 'member',
        meta:{
          title:'会员管理'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/member.vue')
      },{
        path: '/supplier',
        name: 'supplier',
        meta:{
          title:'供应商管理'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/supplier.vue')
      },{
        path: '/goods',
        name: 'goods',
        meta:{
          title:'商品管理'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/goods.vue')
      },{
        path: '/staff',
        name: 'staff',
        meta:{
          title:'员工管理'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/staff.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (token && to.path == '/login') {
    // if (!store.state.userInfo) {
    //   store.commit('getuserinfo')
    // }
    next('/')
  } else if (!token && to.path != "/login") {
    next('/login')
  } else {
    next()
  }
})

export default router
