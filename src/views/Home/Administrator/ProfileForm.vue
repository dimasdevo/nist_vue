<template>
  <div id="profile-form">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
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
                              label="ID PROFILE"
                              v-model="profile.i_profl"
                            ></v-text-field>

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
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-autocomplete
                            v-model="profile.i_menu"
                            :loading="menu_select.loading"
                            :items="menu_select.menus"
                            :search-input.sync="menu_select.search"
                            cache-items
                            flat
                            hide-no-data
                            hide-details
                            label="FIND MENU ?"
                            solo-inverted
                            multiple
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-container>
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
        <v-card-title class="text-h5">Are you sure you want to delete this profile ID : {{profile.i_profl}}?</v-card-title>
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
        e_profl: "",
        i_entry: "",
        i_update: "",
        i_menu:null,
      },
      menu_select: {
        loading: true,
        items: [],
        search: null,
        select: null,
        menus: [],
      },
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating profile";
            this.$emit("edit-profile", this.profile.i_profl, this.profile);
            break;

          case "delete":
            this.text = "Succesfull deleting profile";
            this.$emit("delete-profile", this.profile.i_profl);
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
      this.text = "Succesfull deleting profile";
      this.$emit("del-profile", this.profile.i_profl);
      this.clearData();
    },
    clearData() {
      this.profile = {
        i_profl: "",
        e_profl: "",
        i_entry: "",
        i_update: "",
        i_menu:null,
      };
      this.e1=1;
      this.dialog = false;
      this.dialogDelete = false;
      this.menu_select.select = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD PROFILE";
      this.type = "add";
      this.profile.i_menu=["1","2"];
      this.populateMenu();
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.profile = data;
      console.log(this.profile);
      this.title = "FORM EDIT PROFILE";
      this.type = "edit";
      this.populateMenu();
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.profile = data;
      this.type = "delete";
    },
    
    async populateMenu() {
      var self = this;
      await axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/menu`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.menu_select.menus = data.map((obj) => {
              let rObj = {};
              rObj["text"] = obj.n_menu;
              rObj["value"] = obj.i_menu;
              return rObj;
            });
            self.menu_select.loading = false;
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getMenu(id) {
      let self = this;
      await axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/menu/profile/${id}`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data[0].i_profl;
            data = data.map((obj) => {
              return obj.i_profl;
            });
            self.profile.i_profl = data;
          } else {
            console.log("gagal");
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