<template>
  <div class="container">
    <h1 class="mb-4">Daftar Host</h1>
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
            <download-excel :data="hosts" name="hosts.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="hosts" type="csv" name="hosts.csv">
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
    <host-table v-bind:hosts="hosts" />
    <host-form
      ref="hostform"
      @edit-host="editHost"
      @add-host="addHost"
      @del-host="deleteHost"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import HostTable from "./HostTable.vue";
import HostForm from "./HostForm.vue";

export default {
  name: "Host",
  components: {
    HostTable,
    HostForm
  },
  data() {
    return {
      hosts: [],
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.hostform.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.hostform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.hostform.openDialogDelete(data);
    },
    editHost(id, host) {
      let it = this;
      let data = {
        n_server_clu: host.n_server_clu,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/server/host`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateHost();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addHost(host) {
      let it = this;
      let formData = new FormData();
      formData.append("n_server_clu", host.n_server_clu);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/server/host`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateHost();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteHost(id) {
      let it = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/server/host`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateHost();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateHost() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/server/host`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.hosts = data;
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
    console.log("host populate")
    this.populateHost();
  },
};
</script>

<style>
#host {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>