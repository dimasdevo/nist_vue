<template>
  <div class="kegiatan-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-text-field
                label="ID Kegiatan"
                placeholder="Input id kegiatan"
                v-model="kegiatan.i_lkm_kegiatan"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Nama Kegiatan"
                placeholder="Input kegiatan"
                v-model="kegiatan.n_lkm_kegiatan"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3" v-if="type!=='edit'">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date_agg"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Year-Month"
                    readonly
                    filled
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_agg"
                  type="month"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{kegiatan.n_lkm_kegiatan}}?</v-card-title>
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
  name: "kegiatan-add",
  data() {
    return {
      snackbar: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH KEGIATAN",
      dialog: false,
      dialogDelete: false,
      kegiatan: {
        i_lkm_kegiatan:"",
        n_lkm_kegiatan:"",
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating kegiatan";
            this.$emit("edit-kegiatan", this.kegiatan.i_lkm_kegiatan, this.kegiatan);
            break;

          case "delete":
            this.text = "Succesfull deleting kegiatan";
            this.$emit("del-kegiatan", this.kegiatan.i_lkm_kegiatan);
            break;

          default:
            this.text = "Succesfull adding  kegiatan";
            console.log(this.kegiatan)
            this.$emit("add-kegiatan", this.kegiatan);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.snackbar = true;
      this.text = "Succesfull deleting kegiatan";
      this.$emit("del-kegiatan", this.kegiatan.i_lkm_kegiatan);
      this.clearData();
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.kegiatan = {
        i_lkm_kegiatan:"",
        n_lkm_kegiatan:"",
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD KEGIATAN";
      this.type = "add";
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.kegiatan = data;
      this.title = "FORM EDIT KEGIATAN";
      this.type = "edit";
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.kegiatan = data;
      this.type = "delete";
    },
  },
};
</script>