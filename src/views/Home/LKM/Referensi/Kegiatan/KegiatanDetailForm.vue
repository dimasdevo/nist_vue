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
                label="Nama Kegiatan"
                placeholder="Input id kegiatan"
                v-model="kegiatandetail.n_lkm_jobdtl"
                :rules="rules.n_lkm_jobdtl"
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
                v-model="kegiatandetail.e_lkm_jobdtltgt"
                :rules="rules.e_lkm_jobdtltgt"
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{kegiatandetail.n_lkm_jobdtl}}?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" rounded>
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
      color:"green",
      snackbar: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH RINCIAN KEGIATAN",
      dialog: false,
      dialogDelete: false,
      kegiatandetail: {
        i_lkm_jobdtl:"",
        n_lkm_jobdtl:"",
        i_lkm_job:"",
        d_lkm_milstart:"",
        d_lkm_milend:"",
        e_lkm_jobdtltgt:"",
      },
       rules:{
        n_lkm_jobdtl: [(v) => (!!v && v.length <= 150)||"Nama Kegiatan is required"],
        e_lkm_jobdtltgt: [(v) => (!!v  && v.length <= 150)||"Target Kegiatan is required"],
      },
      dates:[],
      menu: false
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        switch (this.type) {
          case "edit":
            this.kegiatandetail.d_lkm_milstart=this.dates[0];
            this.kegiatandetail.d_lkm_milend=this.dates[1];
            this.$emit("edit-kegiatan", this.kegiatandetail.i_lkm_jobdtl, this.kegiatandetail);
            break;

          default:
            this.kegiatandetail.d_lkm_milstart=this.dates[0];
            this.kegiatandetail.d_lkm_milend=this.dates[1];
            this.$emit("add-kegiatan", this.kegiatandetail);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.$emit("del-kegiatan", this.kegiatandetail.i_lkm_jobdtl);
      this.clearData();
    },
    showSnackBar(succes,text){
      this.color = (succes)?"green":"red";
      this.text = text;
      this.snackbar = true;
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.kegiatandetail = {
        i_lkm_jobdtl:"",
        n_lkm_jobdtl:"",
        i_lkm_job:"",
        d_lkm_milstart:"",
        d_lkm_milend:"",
        e_lkm_jobdtltgt:"",
        d_lkm_mil:[],
      };
      this.dates=[];
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd(kegiatan) {
      this.dialog = true;
      this.title = "FORM ADD RINCIAN KEGIATAN";
      this.type = "add";
      this.kegiatandetail.i_lkm_job = kegiatan.i_lkm_job
    },
    openDialogEdit(data,kegiatan) {
      this.dialog = true;
      this.kegiatandetail = data;
      this.dates=[this.kegiatandetail.d_lkm_milstart,this.kegiatandetail.d_lkm_milend];
      this.kegiatandetail.i_lkm_job = kegiatan.i_lkm_job
      this.title = "FORM EDIT RINCIAN KEGIATAN";
      this.type = "edit";
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.kegiatandetail = data;
      this.type = "delete";
    },
  },
};
</script>