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
    <v-btn dark @click="openAddDialog" class="ma-1">
      <span>Add</span>
      <v-icon right>mdi-plus</v-icon>
    </v-btn>
    <lun-table v-bind:luns="luns" />
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
    LunForm
  },
  data() {
    return {
      luns: [],
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
      let it = this;
      let data = {
        n_stor_lun: lun.n_stor_lun,
        q_stor_lun: lun.q_stor_lun,
        c_stor_lun: lun.c_stor_lun,
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
          it.populateLun();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addLun(lun) {
      let it = this;
      let formData = new FormData();
      formData.append("n_stor_lun", lun.n_stor_lun);
      formData.append("q_stor_lun", lun.q_stor_lun);
      formData.append("c_stor_lun", lun.c_stor_lun);
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
          it.populateLun();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteLun(id) {
      let it = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/storage/lun`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateLun();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateLun() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/lun`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.luns = data;
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