<template>
  <div class="container" v-if="showAcc">
    <v-card-title><h1 class="mb-4">Akumulasi Volume: {{this.id_volume.n_stor_vol}}</h1></v-card-title>
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
            <download-excel :data="volumeaccs" name="volumeaccs.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="volumeaccs" type="csv" name="volumeaccs.csv">
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
    <volume-accumulate-table 
      v-bind:volumeaccs="volumeaccs" 
      v-bind:loading="loading"
      v-bind:menuauth="menuauth"/>
    <volume-accumulate-form
      ref="volumeaccform"
      @edit-volume-accumulate="editVolumeAccumulate"
      @add-volume-accumulate="addVolumeAccumulate"
      @del-volume-accumulate="deleteVolumeAccumulate"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import VolumeAccumulateTable from "./VolumeAccumulateTable.vue";
import VolumeAccumulateForm from "./VolumeAccumulateForm.vue";

export default {
  name: "Volume-accumulate",
  components: {
    VolumeAccumulateTable,
    VolumeAccumulateForm
  },
  props:{
    menuauth:Object
  },
  data() {
    return {
      id_volume:null,
      showAcc:false,
      i_entry:"",
      volumeaccs: [],
      loading: false,
      rounded:true,
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.volumeaccform.openDialogAdd(this.id_volume);
    },
    openEditDialog(data) {
      this.$refs.volumeaccform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.volumeaccform.openDialogDelete(data);
    },
    editVolumeAccumulate(id, accumulate) {
      this.loading=true;
      let self = this;
      let data = {
        q_stor_used: accumulate.q_stor_used,
        i_update:this.i_entry,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/storage/volume/accumulate`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          self.populateVolumeAccumulate();
          self.loading=false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addVolumeAccumulate(accumulate) {
      this.loading=true;
      let self = this;
      let formData = new FormData();
      formData.append("c_stor_vol", accumulate.c_stor_vol);
      formData.append("d_year", accumulate.d_year);
      formData.append("d_month", accumulate.d_month);
      formData.append("q_stor_used", accumulate.q_stor_used);
      formData.append("i_entry",this.i_entry);
      formData.append("i_update",this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/storage/volume/accumulate`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          self.populateVolumeAccumulate();
          self.loading=false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteVolumeAccumulate(id) {
      this.loading=true;
      let self = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/storage/volume/accumulate`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          self.populateVolumeAccumulate();
          self.loading=false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateVolumeAccumulate() {
      this.loading=true;
      this.volumeaccs=[];
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/volume/accumulate`,
        params: { id: this.id_volume.c_stor_vol },
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.volumeaccs = data;
            self.loading=false;
          } else {
            console.log("gagal");
          }
          self.loading=false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    refresh(){
      this.populateVolumeAccumulate();
    },
    back(){
      this.showAcc = false;
      this.$emit("close-volume-accumulate");
    },
    openDialogAccumulate(id){
      this.id_volume = id;
      this.showAcc = true;
      let user = JSON.parse( this.$store.getters.user);
      this.i_entry =  user.i_user;
      this.populateVolumeAccumulate();
    }
  },
};
</script>

<style>
#volume {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>