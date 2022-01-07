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
                label="Nama JOb"
                placeholder="Input id kegiatan"
                v-model="kegiatan.i_lkm_job"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Nama Acty Org"
                placeholder="Input id kegiatan"
                v-model="kegiatan.i_lkm_actyorg"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Nama Kegiatan"
                placeholder="Input id kegiatan"
                v-model="kegiatan.n_lkm_job"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="dates"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dates"
                    label="Rentang Milestone"
                    readonly
                    filled
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dates"
                  type="month"
                  range
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
                    @click="$refs.menu.save(dates)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Target Kegiatan"
                placeholder="Input kegiatan"
                v-model="kegiatan.e_lkm_jobtgt"
                filled
              >
              </v-text-field>
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{kegiatan.n_lkm_job}}?</v-card-title>
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
        i_lkm_job:"",
        n_lkm_job:"",
        i_lkm_actyorg:"",
        d_lkm_milstart:"",
        d_lkm_milend:"",
        e_lkm_jobtgt:"",
      },
      dates:[],
      menu: false
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating kegiatan";
            this.$emit("edit-kegiatan", this.kegiatan.i_lkm_job, this.kegiatan);
            break;

          case "delete":
            this.text = "Succesfull deleting kegiatan";
            this.$emit("del-kegiatan", this.kegiatan.i_lkm_job);
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
      this.$emit("del-kegiatan", this.kegiatan.i_lkm_job);
      this.clearData();
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.kegiatan = {
        i_lkm_job:"",
        n_lkm_job:"",
        i_lkm_actyorg:"",
        d_lkm_milstart:"",
        d_lkm_milend:"",
        e_lkm_jobtgt:"",
        d_lkm_mil:[],
      };
      this.dates=[];
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
      this.dates=[this.kegiatan.d_lkm_milstart,this.kegiatan.d_lkm_milend];
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