<template>
  <div class="container">
    <h1 class="mb-4">Daftar Aktivitas</h1>
    <hr />
    <v-btn dark class="ma-1">
      <span>Filter</span>
      <v-icon right>mdi-filter</v-icon>
    </v-btn>
    <v-btn dark @click="refresh" class="ma-1">
      <span>Refresh</span>
      <v-icon right>mdi-cloud-refresh</v-icon>
    </v-btn>
    <aktivitas-table v-bind:aktivitass="aktivitass" v-bind:menuauth="menuauth" v-bind:loading="loading"/>
  </div>
</template>
<script>
import axios from "axios";

import AktivitasTable from "./AktivitasTable.vue";

export default {
  name: "Peran-Aktivitas",
  components: {
    AktivitasTable,
  },
  data() {
    return {
      job: null,
      template:null,
      menuauth:{
        f_add:'0',
        f_edit:'0',
        f_delete:'0',
      },
      i_entry:"",
      aktivitass: [],
      loading:false
    };
  },
  methods: {
    setAktivitas(aktivitas){
      this.$emit("set-aktivitas", aktivitas) ;
    },
    populateAktivitas() {
      let self = this;
      let options = {
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/lkm/activity/job`,
        params: {i_lkm_tmpl:this.template.i_lkm_tmpl}
      };

      axios
        .request(options)
        .then((response)=> {
          if (response.status === 200) {
            let data = response.data;
            self.aktivitass = data;
            self.loading = false;
          } else {
            console.log("gagal");
          }
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateAktivitasInit() {
      this.loading = true;
      this.aktivitas = [];
      let self = this;
      let options = {
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/lkm/template/active`,
      };

      axios
        .request(options)
        .then((response)=> {
          if (response.status === 200) {
            let data = response.data;
            self.template = data[0];
            self.populateAktivitas();
          } else {
            console.log("gagal");
          }
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    refresh(){
      this.populateAktivitasInit();
    }
  },
  mounted() {
    let user = JSON.parse( this.$store.getters.user);
    let menuauth = JSON.parse( this.$store.getters.menuAuth);
    this.menuauth = menuauth.filter((element)=>{return element.id=='144'})[0];
    this.i_entry =  user.i_user;
    this.populateAktivitasInit();
  },
};
</script>

<style>
#aktivitas {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>