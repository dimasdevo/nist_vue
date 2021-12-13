<template>
  <div class="container">
    <h1 class="mb-4">Daftar VM</h1>
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
            <download-excel :data="vms" name="vms.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="vms" type="csv" name="vms.csv">
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
    <vm-table v-bind:vms="vms" />
    <vm-form
      ref="vmform"
      @edit-vm="editVm"
      @add-vm="addVm"
      @del-vm="deleteVm"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import VmTable from "./VmTable.vue";
import VmForm from "./VmForm.vue";

export default {
  name: "Vm",
  components: {
    VmTable,
    VmForm
  },
  data() {
    return {
      vms: [],
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.vmform.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.vmform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.vmform.openDialogDelete(data);
    },
    editVm(id, vm) {
      let it = this;
      let data = {
        n_server_clu: vm.n_server_clu,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/server/vm`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateVm();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addVm(vm, vmdns) {
      let it = this;
      let formData = new FormData();
      formData.append("n_server_vm", vm.n_server_vm);
      formData.append("e_server_vm", vm.e_server_vm);
      formData.append("n_server_vmcls", vm.n_server_vmcls);
      formData.append("c_server_clu", vm.c_server_clu);
      formData.append("c_server_host", vm.c_server_host);
      formData.append("c_stor_ds", vm.c_stor_ds);
      formData.append("n_server_vmos", vm.n_server_vmos);
      formData.append("c_server_vmdns", JSON.stringify(vmdns));
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/server/vm`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateVm();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteVm(id) {
      let it = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/server/vm`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateVm();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateVm() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/server/vm`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.vms = data;
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
    console.log("vm populate")
    this.populateVm();
  },
};
</script>

<style>
#vm {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>