<template>
  <div id="profile-form">
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="1000"
    >
      <v-card tile>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                  INPUT PROFILE
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">
                  FIND MENU
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3"> CONFIRMATION </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card :outlined="false">
                    <v-container>
                      <v-row>
                        <v-col>
                          <div>
                            <v-text-field
                              label="JUDUL PROFILE"
                              v-model="profile.n_profl"
                            ></v-text-field>
                            <v-text-field
                              label="DESKRIPSI PROFILE"
                              v-model="profile.e_profl"
                            ></v-text-field>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                  <v-divider></v-divider>
                  <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

                  <v-btn text @click="closeDelete"> Cancel </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card :outlined="false">
                    <v-simple-table 
                      fixed-header
                      height="500">
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th colspan=3 class="text-left">
                                NAME
                              </th>
                              <th class="text-center">
                                VIEW
                              </th>
                              <th class="text-center">
                                READ
                              </th>
                              <th class="text-center">
                                ADD
                              </th>
                              <th class="text-center">
                                EDIT
                              </th>
                              <th class="text-center">
                                DELETE
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in items"
                                :key="item.i_menu">
                              
                              <td colspan=3>
                                <span v-for="i in parseInt(item.i_menu_lvl)-1" :key="i">&ensp;&ensp;&ensp;</span>
                                ----- {{item.n_menu}}
                              </td>
                              <td>
                                <v-checkbox
                                    color="primary"
                                    label="VIEW"
                                    v-model="profile.f_menu_view"
                                    :value="item.i_menu"
                                  ></v-checkbox>
                              </td>
                              <td>
                                <v-checkbox
                                    v-if="item.c_menu_type=='T'"
                                    color="primary"
                                    label="READ"
                                    v-model="profile.f_menu_read"
                                    :value="item.i_menu"
                                  ></v-checkbox>
                              </td>
                              <td>
                                <v-checkbox
                                  v-if="item.c_menu_type=='T'"
                                    color="primary"
                                    label="ADD"
                                    v-model="profile.f_menu_add"
                                    :value="item.i_menu"
                                  ></v-checkbox>
                              </td>
                              <td>
                                <v-checkbox
                                    v-if="item.c_menu_type=='T'"
                                    color="primary"
                                    label="EDIT"
                                    v-model="profile.f_menu_edit"
                                    :value="item.i_menu"
                                  ></v-checkbox>
                              </td>
                              <td>
                                <v-checkbox
                                    v-if="item.c_menu_type=='T'"
                                    color="primary"
                                    label="DELETE"
                                    v-model="profile.f_menu_delete"
                                    :value="item.i_menu"
                                  ></v-checkbox>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                  </v-card>

                  <v-divider></v-divider>

                  <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>
                  <v-btn color="warning" @click="e1 = 1"> Back </v-btn>
                  <v-btn text @click="closeDelete"> Cancel </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card :outlined="false">
                    <v-card-text>
                    Are you sure to {{this.type}} profile {{profile.i_emp}}?
                    </v-card-text>
                  </v-card>
                  
                  <v-divider></v-divider>
                  <v-btn class="ma-2" type="submit" depressed color="primary"
                    >Submit</v-btn
                  >
                  <v-btn color="warning" @click="e1 = 2"> Back </v-btn>
                  <v-btn text @click="closeDelete"> Cancel </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-toolbar
              color="red"
              dark
            >CONFIRMATION</v-toolbar>
        <v-card-text class="text-h5">Are you sure you want to delete this profile ID : {{profile.n_profl}}?</v-card-text>
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
  name: "profile-form",
  data() {
    return {
      e1: 1,
      snackbar: false,
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH PROFILE",
      dialog: false,
      dialogDelete: false,
      dialogEmployee: false,
      profile: {
        i_profl: "",
        n_profl: "",
        e_profl: "",
        i_entry: "",
        i_update: "",
        i_menu:[],
        f_menu_view:[],
        f_menu_read:[],
        f_menu_edit:[],
        f_menu_add:[],
        f_menu_delete:[],
      },
      items:[],
      loadingFetch:true
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.profile.i_menu=[];
        this.items.forEach(element => {
          let rObj = {};
          if(this.profile.f_menu_view.indexOf(element.i_menu)!==-1){
            rObj['i_menu']=element.i_menu;
            rObj['f_menu_view']='1';
            rObj['f_menu_read']=(this.profile.f_menu_read.indexOf(element.i_menu)!==-1?'1':'0');
            rObj['f_menu_add']=(this.profile.f_menu_add.indexOf(element.i_menu)!==-1?'1':'0');
            rObj['f_menu_delete']=(this.profile.f_menu_delete.indexOf(element.i_menu)!==-1?'1':'0');
            rObj['f_menu_edit']=(this.profile.f_menu_edit.indexOf(element.i_menu)!==-1?'1':'0'); 
            this.profile.i_menu.push(rObj);
          }
        });
        console.log(this.profile.i_menu);
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating profile";
            this.$emit("edit-profile", this.profile.i_profl, this.profile);
            break;

          default:
            this.text = "Succesfull adding  profile";
            this.$emit("add-profile", this.profile);
            break;
        }
        this.clearData();
      }
    },
    closeDelete() {
      this.clearData();
    },
    deleteItemConfirm(){
      this.snackbar = true;
      this.text = "Succesfull deleting profile";
      this.$emit("del-profile", this.profile.i_profl);
      this.clearData();
    },
    clearData() {
      this.profile = {
        i_profl: "",
        n_profl: "",
        e_profl: "",
        i_entry: "",
        i_update: "",
        i_menu:[],
        f_menu_view:[],
        f_menu_read:[],
        f_menu_edit:[],
        f_menu_add:[],
        f_menu_delete:[],
      };
      this.items=[];
      this.e1=1;
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD PROFILE";
      this.type = "add";
      this.populateMenu();
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.profile.i_profl = data.i_profl;
      this.profile.n_profl = data.n_profl;
      this.profile.e_profl = data.e_profl;
      this.title = "FORM EDIT PROFILE";
      this.type = "edit";
      this.populateMenuAuth();

    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.profile.i_profl = data.i_profl;
      this.profile.n_profl = data.n_profl;
      this.type = "delete";
    },
     populateMenu() {
      var self = this;
       axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/menu/all`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.items = data;
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
     populateMenuAuth() {
       this.loadingFetch=true;
      var self = this;
      let id = this.profile.i_profl;
       axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/menu/profiletable/${id}`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.items = data;
            self.items.forEach(element => {
                if(element.f_menu_view=="1") self.profile.f_menu_view.push(element.i_menu)
                if(element.f_menu_read=="1") self.profile.f_menu_read.push(element.i_menu)
                if(element.f_menu_add=="1") self.profile.f_menu_add.push(element.i_menu)
                if(element.f_menu_edit=="1") self.profile.f_menu_edit.push(element.i_menu)
                if(element.f_menu_delete=="1") self.profile.f_menu_delete.push(element.i_menu)
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
      
  },
  mounted() {
    console.log("Profile Populate")
  },
};
</script>