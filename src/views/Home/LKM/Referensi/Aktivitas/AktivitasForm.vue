<template>
  <div class="aktivitas-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-text-field
                label="Nama Aktivitas"
                placeholder="Nama Aktivitas"
                v-model="aktivitas.n_lkm_acty"
                :rules="rules.n_lkm_acty"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-select
                v-model="aktivitas.c_lkm_actytype"
                :items="klasifikasi_list"
                label="Tipe Aktivitas"
                :rules="rules.c_lkm_actytype"
                filled
                required
              ></v-select>
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
                label="Target Aktivitas"
                placeholder="Input Target Aktivitas"
                v-model="aktivitas.e_lkm_actytgt"
                :rules="rules.e_lkm_actytgt"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-w">
              <v-select
                v-model="aktivitas.c_org"
                :items="organisasi_list"
                attach
                chips
                filled
                label="Assign To"
                :rules="rules.c_org"
                multiple
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{aktivitas.n_lkm_aktivitas}}?</v-card-title>
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
import axios from "axios";

export default {
  name: "aktivitas-add",
  data() {
    return {
      color:"green",
      snackbar: false,
      klasifikasi_list:[
        {'text':'Program','value':'Program'},
        {'text':'Rutin','value':'Rutin'},
      ],
      organisasi_list:[],
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH AKTIVITAS",
      dialog: false,
      dialogDelete: false,
      aktivitas: {
        i_lkm_tmpl:"",
        i_lkm_acty:"",
        n_lkm_acty:"",
        c_lkm_actytype:"",
        d_lkm_milstart:"",
        d_lkm_milend:"",
        e_lkm_actytgt:"",
        c_org:[],
      },
      rules:{
        n_lkm_acty: [(v) => (!!v && v.length <= 150)||"Nama Aktivitas is required"],
        c_lkm_actytype: [(v) => (!!v)||"Tipe Aktivitas is required"],
        e_lkm_actytgt: [(v) => (!!v  && v.length <= 150)||"Target Aktivitas is required"],
        c_org: [(v) => (!!v )||"Organisasi is required"],
      },
      menu: false,
      dates: [],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        switch (this.type) {
          case "edit":
            this.aktivitas.d_lkm_milstart=this.dates[0];
            this.aktivitas.d_lkm_milend=this.dates[1];
            this.$emit("edit-aktivitas", this.aktivitas.i_lkm_acty, this.aktivitas);
            break;

          default:
            this.aktivitas.d_lkm_milstart=this.dates[0];
            this.aktivitas.d_lkm_milend=this.dates[1];
            this.$emit("add-aktivitas", this.aktivitas);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.$emit("del-aktivitas", this.aktivitas.i_lkm_acty);
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
      this.aktivitas = {
        i_lkm_tmpl:"",
        i_lkm_acty:"",
        n_lkm_acty:"",
        c_lkm_actytype:"",
        d_lkm_milstart:"",
        d_lkm_milend:"",
        e_lkm_actytgt:"",
        d_lkm_mil:[],
        c_org:[],
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd(template) {
      this.dialog = true;
      this.title = "FORM ADD AKTIVITAS";
      this.type = "add";
      this.aktivitas.i_lkm_tmpl = template.i_lkm_tmpl;
      this.populateOrganisasi(template)
    },
    openDialogEdit(data, template) {
      this.dialog = true;
      this.aktivitas = data;
      this.dates=[this.aktivitas.d_lkm_milstart,this.aktivitas.d_lkm_milend];
      this.aktivitas.i_lkm_tmpl = template.i_lkm_tmpl;
      this.aktivitas.c_org = data.org_val.split(',');
      this.title = "FORM EDIT AKTIVITAS";
      this.type = "edit";
      this.populateOrganisasi(template)
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.aktivitas = data;
      this.type = "delete";
    },
    populateOrganisasi(template){
      let self = this;
      let options = {
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/lkm/organisasi/query`,
        params:{c_org_type:'B',i_lkm_tmpl:template.i_lkm_tmpl}
      };

      axios
        .request(options)
        .then((response)=> {
          if (response.status === 200) {
            let data = response.data;
            data = data.map((element)=>{
              let obj={};
              obj['text']=element.c_org;
              obj['value']=element.i_lkm_org;
              return obj;
            })
            data.sort((a,b)=>{return a-b});
            self.organisasi_list = data;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  },
};
</script>