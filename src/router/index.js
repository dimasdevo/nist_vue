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
import Lkm_referensi_organisasi from '../views/Home/LKM/Referensi/Organisasi/Organisasi.vue'
import Lkm_referensi_aktivitas from '../views/Home/LKM/Referensi/Aktivitas/Aktivitas.vue'
import Lkm_referensi_kegiatan from '../views/Home/LKM/Referensi/Kegiatan/Aktivitas.vue'
import Lkm_laporan from '../views/Home/LKM/Laporan/Kegiatan.vue'
import page_404 from '../views/Error/404.vue'
import page_403 from '../views/Error/403.vue'

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
    alias: '/',
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
    component: Asset,
    meta: {
      requiresAuth: true,
    }
  },
  
  {
    path: '/asset/server/cluster',
    name: 'Asset-Server-Cluster',
    component: Asset_Server_Cluster,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/asset/server/host',
    name: 'Asset-Server-Host',
    component: Asset_Server_Host,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/asset/server/vm',
    name: 'Asset-Server-Vm',
    component: Asset_Server_Vm,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/asset/storage/aggregate',
    name: 'asset-storage-aggregate',
    component: Asset_Storage_aggregate,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/asset/storage/volume',
    name: 'asset-storage-volume',
    component: Asset_Storage_volume,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/asset/storage/lun',
    name: 'asset-storage-lun',
    component: Asset_Storage_lun,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/asset/storage/datastore',
    name: 'asset-storage-Datastore',
    component: Asset_Storage_datastore,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/capacity/storage/aggregate',
    name: 'capacity-storage-aggregate',
    component: Capacity_Storage_aggregate,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/capacity/storage/volume',
    name: 'capacity-storage-volume',
    component: Capacity_Storage_volume,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/capacity/storage/lun',
    name: 'capacity-storage-lun',
    component: Capacity_Storage_lun,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/capacity/storage/datastore',
    name: 'capacity-storage-datastore',
    component: Capacity_Storage_datastore,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/adminstration/user',
    name: 'User',
    component: User,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/adminstration/menu',
    name: 'Menu',
    component: Menu,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/adminstration/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/manajemen/referensi/peran-organisasi',
    component: Lkm_referensi_organisasi,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/manajemen/referensi/activity',
    component: Lkm_referensi_aktivitas,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/manajemen/referensi/kegiatan',
    component: Lkm_referensi_kegiatan,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/manajemen/laporan',
    component: Lkm_laporan,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: page_404
  },
  {
    path: '/forbidden',
    name: '403',
    component: page_403
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from, next)=>{
    //CEK APAKAH MASUK HALAMAN UTAMA
    if(to.meta.requiresAuth){
      let menuauth = JSON.parse( localStorage.getItem('menuAuth'));
      if(menuauth.length>0){
        let menufound = menuauth.filter((element)=>{
          return element.link==to.path;
        })
        if(menufound.length>0){
          next();
        }else{
          next({ name: '403' })
        }
      }else{
        next({ name: '403' })
      }
    }else{
      next()
    }
 }
)

export default router;
