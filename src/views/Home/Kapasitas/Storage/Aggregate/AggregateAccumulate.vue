<template>
  <div class="container" v-if="showAcc">
    <h1 class="mb-4">Akumulasi Aggregate: {{this.id_aggregate.n_stor_aggr}}</h1>
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
            <download-excel :data="aggregateaccs" name="aggregateaccs.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="aggregateaccs" type="csv" name="aggregateaccs.csv">
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
    <aggregate-accumulate-table 
      v-bind:aggregateaccs="aggregateaccs" 
      v-bind:loading="loading" 
      v-bind:menuauth="menuauth"/>
    <aggregate-accumulate-form
      ref="aggregateaccform"
      @edit-aggregate-accumulate="editAggregateAccumulate"
      @add-aggregate-accumulate="addAggregateAccumulate"
      @del-aggregate-accumulate="deleteAggregateAccumulate"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import AggregateAccumulateTable from "../Aggregate/AggregateAccumulateTable.vue";
import AggregateAccumulateForm from "../Aggregate/AggregateAccumulateForm.vue";

export default {
  name: "Aggregate-accumulate",
  components: {
    AggregateAccumulateTable,
    AggregateAccumulateForm
  },
  props:{
    menuauth:Object
  },
  data() {
    return {
      id_aggregate:null,
      showAcc:false,
      i_entry:"",
      aggregateaccs: [],
      loading: false,
      rounded:true,
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.aggregateaccform.openDialogAdd(this.id_aggregate);
    },
    openEditDialog(data) {
      this.$refs.aggregateaccform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.aggregateaccform.openDialogDelete(data);
    },
    editAggregateAccumulate(id, accumulate) {
      this.loading=true;
      let self = this;
      let data = {
        q_stor_data: accumulate.q_stor_data,
        q_stor_snapshot: accumulate.q_stor_snapshot,
        q_stor_replcn: accumulate.q_stor_replcn,
        q_stor_footprint: accumulate.q_stor_footprint,
        q_stor_used: accumulate.q_stor_used,
        i_update:this.i_entry,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/storage/aggregate/accumulate`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
            self.$refs.aggregateaccform.showSnackBar(1,"Succesfull update aggregate accumulate");
            self.populateAggregateAccumulate();
          }else{
            self.$refs.aggregateaccform.showSnackBar(0,"Failed update aggregate accumulate");
          }
          self.loading=false;
        }).catch(()=> {
          self.$refs.aggregateaccform.showSnackBar(0,"Failed update aggregate accumulate");
          self.loading=false;
        });
    },
    addAggregateAccumulate(accumulate) {
      this.loading=true;
      let self = this;
      let formData = new FormData();
      formData.append("c_stor_aggr", accumulate.c_stor_aggr);
      formData.append("d_year", accumulate.d_year);
      formData.append("d_month", accumulate.d_month);
      formData.append("q_stor_data", accumulate.q_stor_data);
      formData.append("q_stor_snapshot", accumulate.q_stor_snapshot);
      formData.append("q_stor_replcn", accumulate.q_stor_replcn);
      formData.append("q_stor_footprint", accumulate.q_stor_footprint);
      formData.append("q_stor_used", accumulate.q_stor_used);
      formData.append("i_entry",this.i_entry);
      formData.append("i_update",this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/storage/aggregate/accumulate`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
         if(response.status>= 200 && response.status < 400){
            self.$refs.aggregateaccform.showSnackBar(1,"Succesfull add aggregate accumulate");
            self.populateAggregateAccumulate();
          }else{
            console.log("Failed")
            self.$refs.aggregateaccform.showSnackBar(0,"Failed add aggregate accumulate");
          }
          self.loading=false;
        }).catch(()=> {
          self.$refs.aggregateaccform.showSnackBar(0,"Failed add aggregate accumulate");
          self.loading=false;
        });
    },
    deleteAggregateAccumulate(id) {
      this.loading=true;
      let self = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/storage/aggregate/accumulate`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
            self.$refs.aggregateaccform.showSnackBar(1,"Succesfull delete aggregate accumulate");
            self.populateAggregateAccumulate();
          }else{
            self.$refs.aggregateaccform.showSnackBar(0,"Failed delete aggregate accumulate");
          }
          self.loading=false;
        }).catch(()=> {
          self.$refs.aggregateaccform.showSnackBar(0,"Failed delete aggregate accumulate");
          self.loading=false;
        });
    },
    populateAggregateAccumulate() {
      this.loading=true;
      this.aggregateaccs=[];
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/aggregate/accumulate`,
        params: { id: this.id_aggregate.c_stor_aggr },
      })
        .then(function (response) {
          if (response.status>= 200 && response.status < 400) {
            let data = response.data;
            self.aggregateaccs = data;
            self.loading=false;
          } 
          self.loading=false;
        });
    },
    refresh(){
      this.populateAggregateAccumulate();
    },
    back(){
      this.showAcc = false;
      this.$emit("close-aggregate-accumulate");
    },
    openDialogAccumulate(id){
      this.id_aggregate = id;
      this.showAcc = true;
      let user = JSON.parse( this.$store.getters.user);
      this.i_entry =  user.i_user;
      this.populateAggregateAccumulate();
    }
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