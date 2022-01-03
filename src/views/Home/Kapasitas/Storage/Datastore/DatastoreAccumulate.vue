<template>
  <div class="container" v-if="showAcc">
    <v-card-title><h1 class="mb-4">Akumulasi Datastore: {{this.id_datastore.n_stor_ds}}</h1></v-card-title>
    <hr />
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
            <download-excel :data="datastoreaccs" name="datastoreaccs.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="datastoreaccs" type="csv" name="datastoreaccs.csv">
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
    <v-btn color="red" @click="back" class="ma-1">
      <v-icon left>mdi-backspace</v-icon>
      <span>Back</span>
    </v-btn>
    <datastore-accumulate-table 
      v-bind:datastoreaccs="datastoreaccs" 
      v-bind:loading="loading"
      v-bind:menuauth="menuauth"/>
    <datastore-accumulate-form
      ref="datastoreaccform"
      @edit-datastore-accumulate="editDatastoreAccumulate"
      @add-datastore-accumulate="addDatastoreAccumulate"
      @del-datastore-accumulate="deleteDatastoreAccumulate"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import DatastoreAccumulateTable from "./DatastoreAccumulateTable.vue";
import DatastoreAccumulateForm from "./DatastoreAccumulateForm.vue";

export default {
  name: "Datastore-accumulate",
  components: {
    DatastoreAccumulateTable,
    DatastoreAccumulateForm
  },
  props:{
    menuauth:Object
  },
  data() {
    return {
      id_datastore:null,
      showAcc:false,
      i_entry:"",
      datastoreaccs: [],
      loading: false,
      rounded:true,
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.datastoreaccform.openDialogAdd(this.id_datastore);
    },
    openEditDialog(data) {
      this.$refs.datastoreaccform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.datastoreaccform.openDialogDelete(data);
    },
    editDatastoreAccumulate(id, accumulate) {
      this.loading=true;
      let self = this;
      let data = {
       q_stor_used: accumulate.q_stor_used,
        i_update:this.i_entry,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/storage/datastore/accumulate`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };
      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.datastoreaccform.showSnackBar(1,"Succesfull edit datastore accumulate");
              self.populateDatastoreAccumulate();
          }else{
            self.$refs.datastoreaccform.showSnackBar(0,"Failed edit datastore accumulate");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.datastoreaccform.showSnackBar(0,"Failed edit datastore accumulate");
          self.loading=false;
        });
    },
    addDatastoreAccumulate(accumulate) {
      this.loading=true;
      let self = this;
      let formData = new FormData();
      formData.append("c_stor_ds", accumulate.c_stor_ds);
      formData.append("d_year", accumulate.d_year);
      formData.append("d_month", accumulate.d_month);
      formData.append("q_stor_used", accumulate.q_stor_used);
      formData.append("i_entry",this.i_entry);
      formData.append("i_update",this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/storage/datastore/accumulate`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.datastoreaccform.showSnackBar(1,"Succesfull add datastore accumulate");
              self.populateDatastoreAccumulate();
          }else{
            self.$refs.datastoreaccform.showSnackBar(0,"Failed add datastore accumulate");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.datastoreaccform.showSnackBar(0,"Failed add datastore accumulate");
          self.loading=false;
        });
    },
    deleteDatastoreAccumulate(id) {
      this.loading=true;
      let self = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/storage/datastore/accumulate`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.datastoreaccform.showSnackBar(1,"Succesfull delete datastore accumulate");
              self.populateDatastoreAccumulate();
          }else{
            self.$refs.datastoreaccform.showSnackBar(0,"Failed delete datastore accumulate");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.datastoreaccform.showSnackBar(0,"Failed delete datastore accumulate");
          self.loading=false;
        });
    },
    populateDatastoreAccumulate() {
      this.loading=true;
      this.datastoreaccs=[];
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/datastore/accumulate`,
        params: { id: this.id_datastore.c_stor_ds },
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.datastoreaccs = data;
            self.loading=false;
          }
          self.loading=false;
        });
    },
    refresh(){
      this.populateDatastoreAccumulate();
    },
    back(){
      this.showAcc = false;
      this.$emit("close-datastore-accumulate");
    },
    openDialogAccumulate(id){
      this.id_datastore = id;
      this.showAcc = true;
      let user = JSON.parse( this.$store.getters.user);
      this.i_entry =  user.i_user;
      this.populateDatastoreAccumulate();
    }
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