<template>
  <div class="container">
    <v-container v-if="showMain">
    <h1 class="mb-4">Kapasitas Datastore</h1>
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
    <v-btn dark @click="refresh" class="ma-1">
      <span>Refresh</span>
      <v-icon right>mdi-cloud-refresh</v-icon>
    </v-btn>
    <datastore-table v-bind:datastores="datastores" v-bind:loading="loading" />
     </v-container>
      <v-container>
        <datastore-accumulate 
        ref="datastoreaccumulate" 
        @close-datastore-accumulate="closeAccumulateDialog"
        v-bind:menuauth="menuauth"/>
      </v-container>
  </div>
</template>
<script>
import axios from "axios";

import DatastoreTable from "./DatastoreTable.vue";
import DatastoreAccumulate from './DatastoreAccumulate.vue';

export default {
  name: "Datastore",
  components: {
    DatastoreTable,
    DatastoreAccumulate,
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
      showMain:true,
    };
  },
  methods: {
    openAccumulateDialog(data){
      this.showMain  = false;
      this.$refs.datastoreaccumulate.openDialogAccumulate(data);
    },
    closeAccumulateDialog(){
      this.showMain  = true;
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
    this.menuauth = menuauth.filter((element)=>{return element.id=='108'})[0];
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