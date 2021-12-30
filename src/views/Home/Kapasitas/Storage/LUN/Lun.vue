<template>
  <div class="container">
    <v-container v-if="showMain">
      <h1 class="mb-4">Kapasitas LUN</h1>
      <hr />
      <v-btn dark class="ma-1">
        <span>Import</span>
        <v-icon right>mdi-file-import</v-icon>
      </v-btn>
      <v-menu :rounded="rounded" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark class="ma-1" v-bind="attrs" v-on="on">
            <span>Export</span>
            <v-icon right>mdi-file-export</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <download-excel :data="luns" name="luns.xls">
                Export To XLS
              </download-excel>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <download-excel :data="luns" type="csv" name="luns.csv">
                Export To CSV
              </download-excel>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-divider vertical></v-divider>
      <v-btn dark class="ma-1">
        <span>Filter</span>
        <v-icon right>mdi-filter</v-icon>
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn dark @click="refresh" class="ma-1">
        <span>Refresh</span>
        <v-icon right>mdi-cloud-refresh</v-icon>
      </v-btn>
      <lun-table v-bind:luns="luns" v-bind:loading="loading" />
    </v-container>
    <v-container>
      <lun-accumulate
        ref="lunaccumulate"
        @close-lun-accumulate="closeAccumulateDialog"
        v-bind:menuauth="menuauth"
      />
    </v-container>
  </div>
</template>
<script>
import axios from "axios";

import LunTable from "./LunTable.vue";
import LunAccumulate from "./LunAccumulate.vue";

export default {
  name: "Lun",
  components: {
    LunTable,
    LunAccumulate,
  },
  data() {
    return {
      menuauth:{
        f_add:'0',
        f_edit:'0',
        f_delete:'0',
      },
      i_entry: "",
      luns: [],
      loading: false,
      rounded: true,
      showMain: true,
    };
  },
  methods: {
    openAccumulateDialog(data) {
      console.log(this.$refs.lunaccumulate);
      this.showMain = false;
      this.$refs.lunaccumulate.openDialogAccumulate(data);
    },
    closeAccumulateDialog() {
      this.showMain = true;
    },
    populateLun() {
      this.luns = [];
      this.loading = true;
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/lun`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.luns = data;
            self.loading = false;
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    refresh() {
      this.populateLun();
    },
  },
  mounted() {
    let user = JSON.parse(this.$store.getters.user);
    let menuauth = JSON.parse( this.$store.getters.menuAuth);
    this.menuauth = menuauth.filter((element)=>{return element.id=='107'})[0];
    this.i_entry = user.i_user;
    this.populateLun();
  },
};
</script>

<style>
#lun {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>