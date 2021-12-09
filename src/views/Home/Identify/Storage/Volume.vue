<template>
  <div class="container">
    <h1 class="mb-4">Daftar Volume</h1>
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
            <download-excel :data="volumes" name="volumes.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="volumes" type="csv" name="volumes.csv">
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
    <v-btn dark @click="openAddDialog" class="ma-1">
      <span>Add</span>
      <v-icon right>mdi-plus</v-icon>
    </v-btn>
    <volume-table v-bind:volumes="volumes" />
    <volume-form
      ref="volumeform"
      @edit-volume="editVolume"
      @add-volume="addVolume"
      @del-volume="deleteVolume"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import VolumeTable from "./VolumeTable.vue";
import VolumeForm from "./VolumeForm.vue";

export default {
  name: "Volume",
  components: {
    VolumeTable,
    VolumeForm
  },
  data() {
    return {
      volumes: [],
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.volumeform.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.volumeform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.volumeform.openDialogDelete(data);
    },
    editVolume(id, volume) {
      let it = this;
      let data = {
        n_stor_vol: volume.n_stor_vol,
        q_stor_vol: volume.q_stor_vol,
        c_stor_aggr: volume.c_stor_aggr,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/storage/volume`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateVolume();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addVolume(volume) {
      let it = this;
      let formData = new FormData();
      formData.append("n_stor_vol", volume.n_stor_vol);
      formData.append("q_stor_vol", volume.q_stor_vol);
      formData.append("c_stor_aggr", volume.c_stor_aggr);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/storage/volume`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateVolume();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteVolume(id) {
      let it = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/storage/volume`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateVolume();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateVolume() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/volume`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.volumes = data;
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.populateVolume();
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