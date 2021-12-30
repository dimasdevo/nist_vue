<template>
  <div class="host-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-text-field
                label="Host Name"
                placeholder="Input host name"
                v-model="host.n_server_host"
                :rules="rules.n_server_host"
                filled
              >
              </v-text-field>
              <v-text-field
                label="IP Name"
                placeholder="Input IP host"
                v-model="host.i_server_iphost"
                :rules="rules.i_server_iphost"
                filled
              >
              </v-text-field>
              <v-text-field
                label="Host Domain"
                placeholder="Input host domain"
                v-model="host.n_server_domainhost"
                :rules="rules.n_server_domainhost"
                filled
              >
              </v-text-field>
              <div class="mb-3">
              <v-select
                :items="items"
                v-model="host.c_server_clu"
                filled
                label="Select Cluster"
              ></v-select>
            </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <div class="text-center">
              <v-btn class="ma-2" type="submit" depressed color="primary">Submit</v-btn>
              <v-btn class="ma-2" @click="closeDelete">Cancel</v-btn>
            </div>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this item {{host.n_server_host}}?</v-card-title>
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

export default {
  name: "host-add",
  data() {
    return {
      snackbar: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH HOST",
      dialog: false,
      dialogDelete: false,
      host: {
        c_server_host: "",
        n_server_host: "",
        i_server_iphost: "",
        n_server_domainhost: "",
        c_server_clu: "",
      },
      rules: {
        n_server_host: [(v) => !!v || "Nama Host is required"],
        i_server_iphost: [(v) => !!v || "IP Host is required"],
        n_server_domainhost: [(v) => !!v || "Domain Host is required"],
        c_server_clu: [(v) => !!v || "Cluster is required"],
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating host";
            this.$emit("edit-host", this.host.c_server_host, this.host);
            break;

          case "delete":
            this.text = "Succesfull deleting host";
            this.$emit("del-host", this.host.c_server_host);
            break;

          default:
            this.text = "Succesfull adding  host";
            console.log(this.host)
            this.$emit("add-host", this.host);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.snackbar = true;
      this.text = "Succesfull deleting host";
      this.$emit("del-host", this.host.c_server_host);
      this.clearData();
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.host = {
        c_server_host: "",
        n_server_host: "",
        i_server_iphost: "",
        n_server_domainhost: "",
        c_server_clu: "",
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD HOST";
      this.type = "add";
      this.populateCluster();
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.host = data;
      this.title = "FORM EDIT HOST";
      this.type = "edit";
      this.populateCluster();
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.host = data;
      this.type = "delete";
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
            self.items = data.map(obj =>{
              let rObj = {}
              rObj['text'] = obj.n_server_clu
              rObj['value'] = obj.c_server_clu
              return rObj;
            });
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
};
</script>