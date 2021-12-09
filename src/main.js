import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import store from './plugins/store'
import JsonExcel from "vue-json-excel";

Vue.config.productionTip = false

Vue.component("downloadExcel", JsonExcel);
Vue.use(VueCookie);


new Vue({
  router,
  vuetify,
  axios,
  VueCookie,
  store,
  render: h => h(App)
}).$mount('#app')
