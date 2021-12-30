import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from '../views/Login.vue'
import Asset from '../views/Home/Asset/Perangkat/Hardware/Asset.vue'
import Asset_Server_Cluster from '../views/Home/Asset/Server/Cluster/Cluster.vue'
import Asset_Server_Host from '../views/Home/Asset/Server/Host/Host.vue'
import Asset_Server_Vm from '../views/Home/Asset/Server/VM/Vm.vue'
import Asset_Storage_aggregate from '../views/Home/Asset/Storage/Aggregate/Aggregate.vue'
import Asset_Storage_volume from '../views/Home/Asset/Storage/Volume/Volume.vue'
import Asset_Storage_lun from '../views/Home/Asset/Storage/LUN/Lun.vue'
import Asset_Storage_datastore from '../views/Home/Asset/Storage/Datastore/Datastore.vue'
import Capacity_Storage_aggregate from '../views/Home/Kapasitas/Storage/Aggregate/Aggregate.vue'
import Capacity_Storage_volume from '../views/Home/Kapasitas/Storage/Volume/Volume.vue'
import Capacity_Storage_lun from '../views/Home/Kapasitas/Storage/LUN/Lun.vue'
import Capacity_Storage_datastore from '../views/Home/Kapasitas/Storage/Datastore/Datastore.vue'
import User from '../views/Home/Administrator/User.vue'
import Menu from '../views/Home/Administrator/Menu.vue'
import Profile from '../views/Home/Administrator/Profile.vue'
import Test from '../views/Home/Administrator/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
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
    path: '/asset/perangkat/hardware',
    name: 'Perangkat-Keras',
    component: Asset
  },
  
  {
    path: '/asset/server/cluster',
    name: 'Asset-Server-Cluster',
    component: Asset_Server_Cluster
  },
  {
    path: '/asset/server/host',
    name: 'Asset-Server-Host',
    component: Asset_Server_Host
  },
  {
    path: '/asset/server/vm',
    name: 'Asset-Server-Vm',
    component: Asset_Server_Vm
  },
  {
    path: '/asset/storage/aggregate',
    name: 'asset-storage-aggregate',
    component: Asset_Storage_aggregate
  },
  {
    path: '/asset/storage/volume',
    name: 'asset-storage-volume',
    component: Asset_Storage_volume
  },
  {
    path: '/asset/storage/lun',
    name: 'asset-storage-lun',
    component: Asset_Storage_lun
  },
  {
    path: '/asset/storage/datastore',
    name: 'asset-storage-Datastore',
    component: Asset_Storage_datastore
  },
  {
    path: '/capacity/storage/aggregate',
    name: 'capacity-storage-aggregate',
    component: Capacity_Storage_aggregate
  },
  {
    path: '/capacity/storage/volume',
    name: 'capacity-storage-volume',
    component: Capacity_Storage_volume
  },
  {
    path: '/capacity/storage/lun',
    name: 'capacity-storage-lun',
    component: Capacity_Storage_lun
  },
  {
    path: '/capacity/storage/datastore',
    name: 'capacity-storage-datastore',
    component: Capacity_Storage_datastore
  },
  {
    path: '/adminstration/user',
    name: 'User',
    component: User
  },
  {
    path: '/adminstration/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/adminstration/profile',
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
