<template>
  <div class="container">
    <h1 class="mb-4">Daftar Datastore</h1>
    <hr />
    <v-btn dark class="ma-1">
      <span>Import</span>
      <v-icon right>mdi-file-import</v-icon>
    </v-btn>
    <v-menu  offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark class="ma-1" v-bind="attrs" v-on="on">
          <span>Export</span>
          <v-icon right>mdi-file-export</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="datastores" name="datastores.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="datastores" type="csv" name="datastores.csv">
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
    <datastore-table v-bind:datastores="datastores" v-bind:loading="loading"  v-bind:menuauth="menuauth"/>
    <datastore-form
      ref="datastoreform"
      @edit-datastore="editDatastore"
      @add-datastore="addDatastore"
      @del-datastore="deleteDatastore"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import DatastoreTable from "./DatastoreTable.vue";
import DatastoreForm from "./DatastoreForm.vue";

export default {
  name: "Datastore",
  components: {
    DatastoreTable,
    DatastoreForm,
  },
  data() {
    return {
      menuauth:{
        f_add:'0',
        f_edit:'0',
        f_delete:'0',
      },
      i_entry:"",
      datastores: [],
      loading: false,
      rounded:true,
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.datastoreform.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.datastoreform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.datastoreform.openDialogDelete(data);
    },
    editDatastore(id, datastore) {
      this.loading = true;
      let self = this;
      let data = {
        n_stor_ds: datastore.n_stor_ds,
        q_stor_ds: datastore.q_stor_ds,
        c_stor_lun: datastore.c_stor_lun,
        c_server_clu: datastore.c_server_clu,
        i_update:this.i_entry,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/storage/datastore`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          self.populateDatastore();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addDatastore(datastore) {
      this.loading = true;
      let self = this;
      let formData = new FormData();
      formData.append("n_stor_ds", datastore.n_stor_ds);
      formData.append("q_stor_ds", datastore.q_stor_ds);
      formData.append("c_stor_lun", datastore.c_stor_lun);
      formData.append("c_server_clu", datastore.c_server_clu);
      formData.append("i_entry",this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/storage/datastore`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          self.populateDatastore();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteDatastore(id) {
      this.loading = true;
      let self = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/storage/datastore`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          self.populateDatastore();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateDatastore() {
      this.datastores=[];
      this.loading = true;
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/datastore`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.datastores = data;
          } else {
            console.log("gagal");
          }
          self.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    refresh(){
      this.populateDatastore();
    }
  },
  mounted() {
    let user = JSON.parse( this.$store.getters.user);
    let menuauth = JSON.parse( this.$store.getters.menuAuth);
    this.menuauth = menuauth.filter((element)=>{return element.id=='84'})[0];
    this.i_entry =  user.i_user;
    this.populateDatastore();
  },
};
</script>

<style>
#datastore {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>