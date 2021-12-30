<template>
  <div class="lun-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-text-field
                label="Lun Name"
                placeholder="Input lun name"
                v-model="lun.n_stor_lun"
                :rules="rules.n_stor_lun"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Size Lun (TB)"
                placeholder="Input lun"
                v-model="lun.q_stor_lun"
                type="number"
                :rules="rules.q_stor_lun"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-select
                :items="items"
                v-model="lun.c_stor_vol"
                filled
                label="Select Volume"
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{lun.n_stor_lun}}?</v-card-title>
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
  name: "lun-add",
  data() {
    return {
      snackbar: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH LUN",
      dialog: false,
      dialogDelete: false,
      lun: {
        c_stor_lun:"",
        n_stor_lun: "",
        q_stor_lun: "",
        c_stor_vol: "",
      },
      rules: {
        n_stor_lun: [(v) => !!v || "Nama Lun is required"],
        q_stor_lun: [(v) => !!v || "Size Lun is required"],
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating lun";
            this.$emit("edit-lun", this.lun.c_stor_lun, this.lun);
            break;

          case "delete":
            this.text = "Succesfull deleting lun";
            this.$emit("del-lun", this.lun.c_stor_lun);
            break;

          default:
            this.text = "Succesfull adding  lun";
            console.log(this.lun)
            this.$emit("add-lun", this.lun);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.snackbar = true;
      this.text = "Succesfull deleting lun";
      this.$emit("del-lun", this.lun.c_stor_lun);
      this.clearData();
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.lun = {
        c_stor_lun:"",
        n_stor_lun: "",
        q_stor_lun: "",
        c_stor_vol: "",
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD LUN";
      this.type = "add";
      this.populateVol();
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.lun = data;
      this.title = "FORM EDIT LUN";
      this.type = "edit";
      this.populateVol();
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.lun = data;
      this.type = "delete";
    },
    populateVol() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/volume`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.items = data.map(obj =>{
              let rObj = {}
              rObj['text'] = obj.n_stor_vol
              rObj['value'] = obj.c_stor_vol
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