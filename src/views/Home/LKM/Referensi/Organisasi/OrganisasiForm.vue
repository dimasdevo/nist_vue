<template>
  <div class="organisasi-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-text-field
                label="Kode Organisasi"
                placeholder="Input organisasi"
                v-model="organisasi.c_org"
                :rules="rules.c_org"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Kode Organisasi Induk"
                placeholder="Input organisasi induk"
                v-model="organisasi.c_org_parent"
                :rules="rules.c_org_parent"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-select
                v-model="organisasi.c_org_type"
                :items="klasifikasi_list"
                :rules="rules.c_org_type"
                label="Klasifikasi"
                required
              ></v-select>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Kode Tanggung Jawab"
                placeholder="Input tanggung jawab"
                v-model="organisasi.c_lkm_resp"
                :rules="rules.c_lkm_resp"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Nama Tanggung Jawab"
                placeholder="Input tanggung jawab"
                v-model="organisasi.n_lkm_resp"
                :rules="rules.n_lkm_resp"
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{organisasi.c_org}}?</v-card-title>
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
  name: "organisasi-add",
  data() {
    return {
      color:"green",
      snackbar: false,
      klasifikasi_list:[
        {'text':'Non Bidang','value':'N'},
        {'text':'Bidang','value':'B'},
      ],
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH ORGANISASI",
      dialog: false,
      dialogDelete: false,
      organisasi: {
        i_lkm_tmpl:"",
        i_lkm_org:"",
        c_org:"",
        c_org_parent:"",
        c_org_type:"",
        c_lkm_resp:"",
        n_lkm_resp:"",
        i_entry:"",
      },
      rules: {
        c_org: [(v) => (!!v && v.length <= 6)||"Kode Organisasi is required"],
        c_org_parent: [(v) => (!!v && v.length <= 6)||"Kode Induk Organisasi is required"],
        c_org_type: [(v) => !!v ||"Tipe Organisasi is required"],
        c_lkm_resp: [(v) => (!!v && v.length <= 1)||"Kode Tanggung Jawab is required"],
        n_lkm_resp: [(v) => (!!v && v.length <= 100)|| "Nama Tanggung Jawab is required"],
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        switch (this.type) {
          case "edit":
            this.$emit("edit-organisasi", this.organisasi.i_lkm_org, this.organisasi);
            break;

          default:
            this.$emit("add-organisasi", this.organisasi);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.$emit("del-organisasi", this.organisasi.i_lkm_org);
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
      this.organisasi = {
        i_lkm_tmpl:"",
        i_lkm_org:"",
        c_org:"",
        c_org_parent:"",
        c_org_type:"",
        c_lkm_resp:"",
        n_lkm_resp:"",
        i_entry:"",
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd(template) {
      this.dialog = true;
      console.log(template);
      this.organisasi.i_lkm_tmpl = template.i_lkm_tmpl;
      this.title = "FORM ADD ORGANISASI";
      this.type = "add";
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.organisasi = data;
      this.title = "FORM EDIT ORGANISASI";
      this.type = "edit";
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.organisasi = data;
      this.type = "delete";
    },
  },
};
</script>