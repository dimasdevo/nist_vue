<template>
  <div class="cluster-form">
    <v-dialog v-model="dialog" width="750">
      <v-card>
        <v-form
          ref="form"
          v-on:submit.prevent="submit"
          v-model="valid"
          lazy-validation
        >
          <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              v-model="vm.n_server_vm"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="vm.e_server_vm"
              label="Peran"
              required
            ></v-text-field>

            <v-select
              v-model="vm.n_server_vmcls"
              :items="klasifikasi_list"
              :rules="[(v) => !!v || 'Item is required']"
              label="Klasifikasi"
              required
            ></v-select>

            <v-select
              v-model="vm.c_server_clu"
              label="Cluster"
              :items="clusters"
              :rules="[(v) => !!v || 'Item is required']"
              v-on:change="populateDSandHost"
              required
            ></v-select>

            <v-select
              v-model="vm.c_server_host"
              label="Host"
              :items="hosts"
              :rules="[(v) => !!v || 'Item is required']"
              v-if="vm.c_server_clu"
              required
            ></v-select>

            <v-select
              v-model="vm.c_stor_ds"
              :items="datastores"
              :rules="[(v) => !!v || 'Item is required']"
              v-if="vm.c_server_clu"
              label="DataStore"
              required
            ></v-select>

            <v-select
              v-model="vm.n_server_vmos"
              :items="os_list"
              :rules="[(v) => !!v || 'Item is required']"
              label="Operating System"
              required
            ></v-select>
            <v-spacer></v-spacer>
            <hr />
            <br />
            <v-btn color="primary" @click="openAddDNSDialog">
              <span>Add</span>
              <v-icon right>mdi-plus</v-icon>
            </v-btn>
            <v-data-table :headers="headers" :items="apps_dns">
              <template v-slot:[`item.action`]="{ item }">
                <v-icon color="red" @click="deleteVmDns(item.c_server_vmdns)"
                  >mdi-delete</v-icon
                >
              </template>
            </v-data-table>
            <br />
            <br />
          </v-card-text>
          <v-card-actions>
            <div class="text-center">
              <v-btn class="ma-2" type="submit" depressed color="primary"
                >Submit</v-btn
              >
              <v-btn class="ma-2" @click="closeDelete">Cancel</v-btn>
            </div>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <vm-dns-form ref="vmdnsform" @add-vm-dns="addVmDns" />
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this item {{vm.n_server_vm}}?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="green" rounded>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import axios from "axios";
import VmDnsForm from "./VmDnsForm.vue";

export default {
  components: { VmDnsForm },
  name: "vm-form",
  data: () => ({
    snackbar: false,
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    text: "",
    timeout: 2000,
    type: "add",
    title: "FORMULIR TAMBAH HOST",
    dialog: false,
    dialogDelete: false,
    valid: true,
    vm: {
      c_server_vm: "",
      n_server_vm: "",
      e_server_vm: "",
      n_server_vmcls: "",
      c_server_clu: "",
      c_server_host: "",
      c_stor_ds: "",
      n_server_vmos: "",
    },
    klasifikasi_list: ["PRODUKSI", "TEST", "DEVELOPMENT"],
    os_list: [],
    headers: [
      { text: "IP", value: "i_server_ipvm", align: "start" },
      { text: "Domain", value: "n_server_vmdomain" },
      { text: "Layanan", value: "n_server_vmsc" },
      { text: "Action", value: "action" },
    ],
    apps_dns: [],
    datastores: [],
    clusters: [],
    hosts: [],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating vm";
            console.log(this.vm);
            console.log(this.apps_dns);
            //this.$emit("edit-vm", this.vm.c_server_vm, this.vm);
            break;

          case "delete":
            this.text = "Succesfull deleting vm";
            this.$emit("del-vm", this.vm.c_server_vm);
            break;

          default:
            this.text = "Succesfull adding  vm";
            console.log(this.vm);
            console.log(this.apps_dns);
            this.$emit("add-vm", this.vm, this.apps_dns);
            break;
        }
        this.clearData();
      }
    },
    populateDSandHost(){
      this.populateDatastore(this.vm.c_server_clu);
      this.populateHost(this.vm.c_server_clu);
    },
    openAddDNSDialog() {
      this.$refs.vmdnsform.openDialogAdd();
    },
    deleteItemConfirm() {
      this.text = "Succesfull deleting vm";
      this.$emit("del-vm", this.vm.c_server_vm);
      this.clearData();
    },
    closeDelete() {
      this.clearData();
    },
    clearData() {
      this.vm = {
        c_server_vm: "",
        n_server_vm: "",
        n_server_act: "",
        n_server_class: "",
        c_server_host: "",
        c_stor_ds: "",
        n_server_os: "",
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD VM";
      this.type = "add";
      this.populateCluster();
      this.populateOS();
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.vm = data;
      this.title = "FORM EDIT VM";
      this.type = "edit";
      this.populateDatastore();
      this.populateCluster();
      this.populateHost();
      this.populateVMDNS();
      this.populateOS();
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.vm = data;
      this.type = "delete";
    },
    addVmDns(dns) {
      this.apps_dns.push(dns);
    },
    deleteVmDns(id) {
      this.apps_dns = this.apps_dns.filter(function (dns) {
        return dns.c_server_vmdns !== id;
      });
    },
    populateDatastore(id) {
      let self = this;
      let options = null;
      if(id){
        options = {
          method: "GET",
          url: `${process.env.VUE_APP_API_NIST}/storage/datastore`,
          params: { c_server_clu: id },
        };
      }else{
        options = {
          method: "GET",
          url: `${process.env.VUE_APP_API_NIST}/storage/datastore`,
        };
      }
      axios(options)
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.datastores = data.map((obj) => {
              let rObj = {};
              rObj["text"] = obj.n_stor_ds;
              rObj["value"] = obj.c_stor_ds;
              return rObj;
            });
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
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
            self.clusters = data.map((obj) => {
              let rObj = {};
              rObj["text"] = obj.n_server_clu;
              rObj["value"] = obj.c_server_clu;
              return rObj;
            });
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    populateHost(id) {
      let self = this;
      let options = null;
      if(id){
        options = {
          method: "GET",
          url: `${process.env.VUE_APP_API_NIST}/server/host`,
          params: { c_server_clu: id },
        };
      }else{
        options = {
          method: "GET",
          url: `${process.env.VUE_APP_API_NIST}/server/host`,
        };
      }
      axios(options)
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.hosts = data.map((obj) => {
              let rObj = {};
              rObj["text"] = obj.n_server_host;
              rObj["value"] = obj.c_server_host;
              return rObj;
            });
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    populateVMDNS() {
      var self = this;
      let options = null;
      if (this.type == "edit") {
        options = {
          method: "GET",
          url: `${process.env.VUE_APP_API_NIST}/server/vmdns`,
          params: { id: this.vm.c_server_vm },
        };
      } else {
        options = {
          method: "GET",
          url: `${process.env.VUE_APP_API_NIST}/server/vmdns`,
        };
      }
      axios
        .request(options)
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.apps_dns = data;
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    populateOS() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/server/os`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.os_list = data.map((obj) => {
              let rObj = {};
              rObj["text"] = obj.n_server_vmos;
              rObj["value"] = obj.n_server_vmos;
              return rObj;
            });
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>