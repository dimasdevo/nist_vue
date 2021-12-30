<template>
    <div class="container">
      <v-container v-if="showMain">
      <h1 class="mb-4">Kapasitas Aggregate</h1>
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
              <download-excel :data="aggregates" name="aggregates.xls">
                Export To XLS
              </download-excel>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <download-excel
                :data="aggregates"
                type="csv"
                name="aggregates.csv"
              >
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
      <aggregate-table
        v-bind:aggregates="aggregates"
        v-bind:loading="loading"
      />
      </v-container>
      <v-container>
        <aggregate-accumulate 
        ref="aggregateaccumulate" 
        @close-aggregate-accumulate="closeAccumulateDialog"
        v-bind:menuauth="menuauth"/>
      </v-container>
    </div>
</template>
<script>
import axios from "axios";

import AggregateTable from "./AggregateTable.vue";
import AggregateAccumulate from './AggregateAccumulate.vue';

export default {
  name: "Aggregate-accumulate",
  components: {
    AggregateTable,
    AggregateAccumulate,
  },
  data() {
    return {
      menuauth:{
        f_add:'0',
        f_edit:'0',
        f_delete:'0',
      },
      i_entry: "",
      aggregates: [],
      loading: false,
      rounded: true,
      showMain:true,
    };
  },
  methods: {
    openAccumulateDialog(data){
      this.showMain  = false;
      this.$refs.aggregateaccumulate.openDialogAccumulate(data);
    },
    closeAccumulateDialog(){
      this.showMain  = true;
    },
    populateAggregate() {
      this.loading = true;
      this.aggregates = [];
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/aggregate`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.aggregates = data;
            self.loading = false;
          } else {
            console.log("gagal");
          }
          self.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    refresh() {
      this.populateAggregate();
    },
  },
  mounted() {
    let user = JSON.parse(this.$store.getters.user);
    let menuauth = JSON.parse( this.$store.getters.menuAuth);
    this.menuauth = menuauth.filter((element)=>{return element.id=='105'})[0];
    this.i_entry = user.i_user;
    this.populateAggregate();
  },
};
</script>

<style>
#aggregate {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>