<template>
  <div class="container">
    <h1 class="mb-4">Daftar Cluster</h1>
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
            <download-excel :data="clusters" name="clusters.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="clusters" type="csv" name="clusters.csv">
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
    <cluster-table v-bind:clusters="clusters" />
    <cluster-form
      ref="clusterform"
      @edit-cluster="editCluster"
      @add-cluster="addCluster"
      @del-cluster="deleteCluster"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import ClusterTable from "./ClusterTable.vue";
import ClusterForm from "./ClusterForm.vue";

export default {
  name: "Cluster",
  components: {
    ClusterTable,
    ClusterForm
  },
  data() {
    return {

      clusters: [],
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.clusterform.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.clusterform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.clusterform.openDialogDelete(data);
    },
    editCluster(id, cluster) {
      let it = this;
      let data = {
        n_server_clu: cluster.n_server_clu,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/server/cluster`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateCluster();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addCluster(cluster) {
      let it = this;
      let formData = new FormData();
      formData.append("n_server_clu", cluster.n_server_clu);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/server/cluster`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateCluster();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteCluster(id) {
      let it = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/server/cluster`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateCluster();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateCluster() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/server/cluster`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.clusters = data;
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
    console.log("cluster populate")
    this.populateCluster();
  },
};
</script>

<style>
#cluster {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>