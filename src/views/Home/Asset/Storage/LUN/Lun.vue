<template>
  <div class="container">
    <h1 class="mb-4">Daftar LUN</h1>
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
      <v-btn dark @click="openAddDialog" class="ma-1" v-if="menuauth.f_add=='1'">
        <span>Add</span>
        <v-icon right>mdi-plus</v-icon>
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn dark @click="refresh" class="ma-1">
        <span>Refresh</span>
        <v-icon right>mdi-cloud-refresh</v-icon>
      </v-btn>
      <lun-table 
        v-bind:luns="luns" 
        v-bind:loading="loading" 
        v-bind:menuauth="menuauth"/>
      <lun-form
        ref="lunform"
        @edit-lun="editLun"
        @add-lun="addLun"
        @del-lun="deleteLun"
      />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import LunTable from "./LunTable.vue";
import LunForm from "./LunForm.vue";

export default {
  name: "Lun",
  components: {
    LunTable,
    LunForm,
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
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.lunform.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.lunform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.lunform.openDialogDelete(data);
    },
    editLun(id, lun) {
      this.loading = true;
      let self = this;
      let data = {
        n_stor_lun: lun.n_stor_lun,
        q_stor_lun: lun.q_stor_lun,
        c_stor_lun: lun.c_stor_lun,
        i_update: this.i_entry,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/storage/lun`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          self.populateLun();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addLun(lun) {
      this.loading = true;
      let self = this;
      let formData = new FormData();
      formData.append("n_stor_lun", lun.n_stor_lun);
      formData.append("q_stor_lun", lun.q_stor_lun);
      formData.append("c_stor_lun", lun.c_stor_lun);
      formData.append("i_entry", this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/storage/lun`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          self.populateLun();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteLun(id) {
      this.loading = true;
      let self = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/storage/lun`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          self.populateLun();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
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
    this.menuauth = menuauth.filter((element)=>{return element.id=='83'})[0];
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