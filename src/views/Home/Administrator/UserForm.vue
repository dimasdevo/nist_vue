<template>
  <div id="user-form">
    <v-dialog
      v-model="dialog"
    >
      <v-card tile>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                  SELECT EMPLOYEE
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">
                  FIND PROFILE
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
                          <v-autocomplete
                            v-model="employee_select.select"
                            :loading="employee_select.loading"
                            :items="employee_select.employees"
                            :search-input.sync="employee_select.search"
                            @change="changeSelect"
                            cache-items
                            flat
                            hide-no-data
                            hide-details
                            label="FIND EMPLOYEE ?"
                            solo-inverted
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div :hidden="!dialogEmployee">
                            <v-text-field
                              label="ID USER"
                              v-model="user.i_user"
                              v-if="user.i_user!=''"
                              disabled
                            ></v-text-field>
                            <v-text-field
                              label="NIK"
                              v-model="user.i_emp"
                              disabled
                            ></v-text-field>
                            <v-text-field
                              label="NAME"
                              v-model="user.n_emp"
                              disabled
                            ></v-text-field>
                            <v-text-field
                              label="ORGANIZATION"
                              v-model="user.c_org_cur"
                              disabled
                            ></v-text-field>
                            <v-text-field
                              label="EMAIL"
                              v-model="user.i_emp_email"
                              disabled
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
                            v-model="user.i_profl"
                            :loading="profile_select.loading"
                            :items="profile_select.profiles"
                            :search-input.sync="profile_select.search"
                            @change="changeSelect"
                            cache-items
                            flat
                            hide-no-data
                            hide-details
                            label="FIND ROLE ?"
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
                    Are you sure to {{this.type}} user {{user.i_emp}}?
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
        <v-card-title class="text-h5">Are you sure you want to delete this user ID : {{user.i_user}}?</v-card-title>
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
  name: "user-form",
  data() {
    return {
      e1: 1,
      snackbar: false,
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH USER",
      dialog: false,
      dialogDelete: false,
      dialogEmployee: false,
      user: {
        i_user: "",
        i_emp: "",
        n_emp: "",
        c_org_cur: "",
        i_emp_email: "",
        i_profl:""
      },
      employee_select: {
        loading: true,
        items: [],
        search: null,
        select: null,
        employees: [],
      },
      profile_select: {
        loading: true,
        items: [],
        search: null,
        select: null,
        profiles: [],
      },
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating user";
            this.$emit("edit-user", this.user.i_user, this.user);
            break;

          case "delete":
            this.text = "Succesfull deleting user";
            this.$emit("delete-user", this.user.i_user);
            break;

          default:
            this.text = "Succesfull adding  user";
            this.$emit("add-user", this.user);
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
      this.text = "Succesfull deleting user";
      this.$emit("del-user", this.user.i_user);
      this.clearData();
    },
    clearData() {
      this.user = {
        i_emp: "",
        n_emp: "",
        c_org_cur: "",
        i_emp_email: "",
        i_profl:""
      };
      this.e1=1;
      this.dialog = false;
      this.dialogDelete = false;
      this.dialogEmployee = false;
      this.employee_select.select = false;
      this.profile_select.select = false;
    },
    changeSelect() {
      this.dialogEmployee = true;
      let employee = this.employee_select.select;
      this.user.i_emp = employee.i_emp;
      this.user.n_emp = employee.n_emp;
      this.user.c_org_cur = employee.c_org_cur;
      this.user.i_emp_email = employee.i_emp_email;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD USER";
      this.type = "add";
      this.populateEmployee();
      this.populateProfile();
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.user = data;
      console.log(this.user);
      this.title = "FORM EDIT USER";
      this.type = "edit";
      this.populateEmployee();
      this.populateProfile();
      this.getProfile(this.user.i_user);
      this.dialogEmployee = true;
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.user = data;
      this.type = "delete";
    },
    
    async populateEmployee() {
      var self = this;
      await axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_HELPDESK}/general/employee`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data.data;
            self.employee_select.employees = data.map((obj) => {
              let rObj = {};
              rObj["text"] = obj.nik + " (" + obj.nama + ")";
              rObj["value"] = {
                 i_emp: obj.nik,
                n_emp: obj.nama,
                c_org_cur: obj.organisasi,
                i_emp_email: obj.email,
              };
              return rObj;
            });
            self.employee_select.loading = false;
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async populateProfile() {
      var self = this;
      await axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/profile`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.profile_select.profiles = data.map((obj) => {
              let rObj = {};
              rObj["text"] = obj.n_profl;
              rObj["value"] = obj.i_profl;
              return rObj;
            });
            self.profile_select.loading = false;
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getProfile(id) {
      let self = this;
      await axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/user/profile/${id}`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data[0].i_profl;
            data = data.map((obj) => {
              return obj.i_profl;
            });
            self.user.i_profl = data;
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>