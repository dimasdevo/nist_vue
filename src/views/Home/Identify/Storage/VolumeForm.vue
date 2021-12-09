<template>
  <div class="volume-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-text-field
                label="Volume Name"
                placeholder="Input volume name"
                v-model="volume.n_stor_vol"
                :rules="rules.n_stor_vol"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Size Volume (TB)"
                placeholder="Input volume"
                v-model="volume.q_stor_vol"
                type="number"
                :rules="rules.q_stor_vol"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-select
                :items="items"
                v-model="volume.c_stor_aggr"
                filled
                label="Select Aggregate"
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{volume.n_stor_vol}}?</v-card-title>
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
  name: "volume-add",
  data() {
    return {
      snackbar: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH VOLUME",
      dialog: false,
      dialogDelete: false,
      volume: {
        c_stor_vol:"",
        n_stor_vol: "",
        q_stor_vol: "",
        c_stor_aggr: "",
      },
      rules: {
        n_stor_vol: [(v) => !!v || "Nama Volume is required"],
        q_stor_vol: [(v) => !!v || "Size Volume is required"],
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating volume";
            this.$emit("edit-volume", this.volume.c_stor_vol, this.volume);
            break;

          case "delete":
            this.text = "Succesfull deleting volume";
            this.$emit("del-volume", this.volume.c_stor_vol);
            break;

          default:
            this.text = "Succesfull adding  volume";
            console.log(this.volume)
            this.$emit("add-volume", this.volume);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.text = "Succesfull deleting volume";
      this.$emit("del-volume", this.volume.c_stor_vol);
      this.clearData();
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.volume = {
        c_stor_vol:"",
        n_stor_vol: "",
        q_stor_vol: "",
        c_stor_aggr: "",
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD VOLUME";
      this.type = "add";
      this.populateAggregate();
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.volume = data;
      this.title = "FORM EDIT VOLUME";
      this.type = "edit";
      this.populateAggregate();
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.volume = data;
      this.type = "delete";
    },
    populateAggregate() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/aggregate`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.items = data.map(obj =>{
              let rObj = {}
              rObj['text'] = obj.n_stor_aggr
              rObj['value'] = obj.c_stor_aggr
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
  }
};
</script>