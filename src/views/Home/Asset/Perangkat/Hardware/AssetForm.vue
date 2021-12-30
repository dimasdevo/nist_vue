<template>
  <div class="asset-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-text-field
                label="Asset Name"
                placeholder="Input asset name"
                v-model="asset.n_asset"
                :rules="rules.n_asset"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Serial Number"
                placeholder="Input Serial Number"
                v-model="asset.i_asset_sn"
                :rules="rules.i_asset_sn"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Inventory Number"
                placeholder="Input Inventory Number"
                v-model="asset.i_asset_inv"
                :rules="rules.i_asset_inv"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Asset Model"
                placeholder="Input Asset Model"
                v-model="asset.n_asset_type"
                :rules="rules.n_asset_type"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Asset Location"
                placeholder="Input Asset Location"
                v-model="asset.a_asset"
                :rules="rules.a_asset"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-textarea
                label="Description"
                placeholder="Input Description"
                v-model="asset.e_asset_note"
                :rules="rules.e_asset_note"
                filled
              >
              </v-textarea>
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{asset.n_asset}}?</v-card-title>
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
export default {
  name: "asset-add",
  data() {
    return {
      snackbar: false,
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH ASSET",
      dialog: false,
      dialogDelete: false,
      asset: {
        i_id:"",
        i_aset: "",
        n_asset: "",
        i_asset_sn: "",
        i_asset_inv: "",
        n_asset_type: "",
        a_asset: "DC IT CENTER",
        e_asset_note: "",
      },
      rules: {
        n_asset: [(v) => !!v || "Asset name is required"],
        i_asset_sn: [(v) => !!v || "Serial Number is required"],
        i_asset_inv: [(v) => !!v || "Inventory Number is required"],
        n_asset_type: [(v) => !!v || "Asset Model is required"],
        a_asset: [(v) => !!v || "Asset Location is required"],
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating asset";
            this.$emit("edit-asset", this.asset.i_id, this.asset);
            break;

          case "delete":
            this.text = "Succesfull deleting asset";
            this.$emit("del-asset", this.asset.i_id);
            break;

          default:
            this.text = "Succesfull adding  asset";
            this.$emit("add-asset", this.asset);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.text = "Succesfull deleting asset";
      this.$emit("del-asset", this.asset.i_id);
      this.clearData();
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.asset = {
        i_id:"",
        n_asset: "",
        i_asset_sn: "",
        i_asset_inv: "",
        n_asset_type: "",
        a_asset: "DC IT CENTER",
        e_asset_note: "",
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD ASSET";
      this.type = "add";
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.asset = data;
      this.title = "FORM EDIT ASSET";
      this.type = "edit";
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.asset = data;
      this.type = "delete";
    },
  },
};
</script>