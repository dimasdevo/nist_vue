<template>
  <div class="datastore-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-text-field
                label="Datastore Name"
                placeholder="Input datastore name"
                v-model="datastore.n_stor_ds"
                :rules="rules.n_stor_ds"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Size Datastore (TB)"
                placeholder="Input datastore"
                v-model="datastore.q_stor_ds"
                type="number"
                :rules="rules.q_stor_ds"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-select
                :items="items"
                v-model="datastore.c_stor_lun"
                filled
                label="Select LUN"
              ></v-select>
            </div>
            <div class="mb-3">
              <v-select
                :items="items_cluster"
                v-model="datastore.c_server_clu"
                filled
                label="Select CLUSTER"
              ></v-select>
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{datastore.n_stor_ds}}?</v-card-title>
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
  name: "datastore-add",
  data() {
    return {
      snackbar: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      items_cluster: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH DATASTORE",
      dialog: false,
      dialogDelete: false,
      datastore: {
        c_stor_ds:"",
        n_stor_ds: "",
        q_stor_ds: "",
        c_stor_lun: "",
        c_server_clu: "",
      },
      rules: {
        n_stor_ds: [(v) => !!v || "Nama Datastore is required"],
        q_stor_ds: [(v) => !!v || "Size Datastore is required"],
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating datastore";
            this.$emit("edit-datastore", this.datastore.c_stor_ds, this.datastore);
            break;

          case "delete":
            this.text = "Succesfull deleting datastore";
            this.$emit("del-datastore", this.datastore.c_stor_ds);
            break;

          default:
            this.text = "Succesfull adding  datastore";
            console.log(this.datastore)
            this.$emit("add-datastore", this.datastore);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.snackbar = true;
      this.text = "Succesfull deleting datastore";
      this.$emit("del-datastore", this.datastore.c_stor_ds);
      this.clearData();
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.datastore = {
        c_stor_ds:"",
        n_stor_ds: "",
        q_stor_ds: "",
        c_stor_lun: "",
        c_server_clu: "",
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD DATASTORE";
      this.type = "add";
      this.populateLun();
      this.populateCluster();
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.datastore = data;
      this.title = "FORM EDIT DATASTORE";
      this.type = "edit";
      this.populateLun();
      this.populateCluster();
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.datastore = data;
      this.type = "delete";
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
            self.items = data.map(obj =>{
              let rObj = {}
              rObj['text'] = obj.n_stor_lun
              rObj['value'] = obj.c_stor_lun
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
            self.items_cluster = data.map(obj =>{
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
    },
  },
};
</script>