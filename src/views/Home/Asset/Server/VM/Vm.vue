<template>
  <div class="container">
    <h1 class="mb-4">Daftar VM</h1>
    <hr />
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
    <v-btn dark @click="openAddDialog" class="ma-1" v-if="menuauth.f_add=='1'">
      <span>Add</span>
      <v-icon right>mdi-plus</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <v-btn dark @click="refresh" class="ma-1">
      <span>Refresh</span>
      <v-icon right>mdi-cloud-refresh</v-icon>
    </v-btn>
    <vm-table v-bind:vms="vms" v-bind:loading="loading" v-bind:menuauth="menuauth"/>
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
      menuauth:{
        f_add:'0',
        f_edit:'0',
        f_delete:'0',
      },
      i_entry:"",
      vms: [],
      loading:false
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
    editVm(id, vm, vmdns) {
      this.loading=true;
      let self = this;
      let data = {
        n_server_vm: vm.n_server_vm,
        e_server_vm: vm.e_server_vm,
        n_server_vmcls: vm.n_server_vmcls,
        c_server_clu: vm.c_server_clu,
        c_server_host: vm.c_server_host,
        c_stor_ds: vm.c_stor_ds,
        n_server_vmos: vm.n_server_vmos,
        c_server_vmdns: JSON.stringify(vmdns),
        i_update:this.i_entry,
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
          self.populateVm();
          self.loading=false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addVm(vm, vmdns) {
      let self = this;
      this.loading=true;
      let formData = new FormData();
      formData.append("n_server_vm", vm.n_server_vm);
      formData.append("e_server_vm", vm.e_server_vm);
      formData.append("n_server_vmcls", vm.n_server_vmcls);
      formData.append("c_server_clu", vm.c_server_clu);
      formData.append("c_server_host", vm.c_server_host);
      formData.append("c_stor_ds", vm.c_stor_ds);
      formData.append("n_server_vmos", vm.n_server_vmos);
      formData.append("c_server_vmdns", JSON.stringify(vmdns));
      formData.append("i_entry",this.i_entry);
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
          self.populateVm();
          self.loading=false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteVm(id) {
      let self = this;
      this.loading=true;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/server/vm`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response);
          self.populateVm();
          self.loading=false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateVm() {
      var self = this;
      this.loading=true;
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
          self.loading=false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    refresh(){
      this.populateVm();
    }
  },
  mounted() {
    let user = JSON.parse( this.$store.getters.user);
    let menuauth = JSON.parse( this.$store.getters.menuAuth);
    this.menuauth = menuauth.filter((element)=>{return element.id=='41'})[0];
    this.i_entry =  user.i_user;
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