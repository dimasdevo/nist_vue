import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from '../views/Login.vue'
import Asset from '../views/Home/Identify/Asset/Asset.vue'
import Storage from '../views/Home/Identify/Storage/Storage.vue'
import Server from '../views/Home/Identify/Server/Server.vue'
import User from '../views/Home/Administrator/User.vue'
import Menu from '../views/Home/Administrator/Menu.vue'
import Profile from '../views/Home/Administrator/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/asset',
    name: 'Asset',
    component: Asset
  },
  {
    path: '/storage',
    name: 'Storage',
    component: Storage
  },
  {
    path: '/server',
    name: 'Server',
    component: Server
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
