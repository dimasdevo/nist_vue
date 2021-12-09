<template>
  <v-app id="inspire">
    <v-main v-bind:hidden="loading">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex>
            <form v-on:submit.prevent="onSignIn">
              <v-card rounded>
                <v-row no-gutters align-content="center">
                  <v-col md="8">
                    <v-img
                      src="/images/2650401.jpg" style="max-height:600px;max-width:700px"
                    ></v-img>
                  </v-col>
                  <v-col md="4">
                    <div style="padding:30px">
                      <div class="text-h3 mb-1">
                        <b>SIGN IN</b>
                      </div>
                      <hr/>
                      <div class="text-h6 mx-1">
                        Welcome To Infra Management Application
                      </div>
                      <br/>
                      <br/>
                        <v-text-field
                          prepend-inner-icon="mdi-account"
                          name="nik"
                          label="NIK"
                          type="text"
                          v-model="nik"
                          outlined
                        ></v-text-field>
                        <v-text-field
                          id="password"
                          prepend-inner-icon="mdi-lock"
                          name="password"
                          label="Password"
                          type="password"
                          autocomplete="on"
                          v-model="password"
                          outlined
                        ></v-text-field>

                        <v-btn color="primary" type="submit" block>Login</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </form>
          </v-flex>
        </v-layout>
      </v-container>    
    </v-main>
    <v-main v-bind:hidden="!loading">
      <v-container fluid fill-height>
        <v-row
          class="fill-height"
          align-content="center"
          justify="center"
        >
          <v-col
            class="text-subtitle-1 text-center"
            cols="12"
          >
            Checking Your Account
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              color="blue darken-4"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
          </v-col>
        </v-row>
    </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="green" rounded>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nik: "",
      password: "",
      loading: false,
      snackbar: false,
      text: 'Lorem ipsum dolor sit amet',
      vertical: true,
      timeout: 2000,
    };
  },
  name: "Login",
  props: {
    source: String,
  },
  methods: {
    onSignIn() {
      this.loading=true;
      this.checkUserInfo();
    },
    checkUserInfo() {
      let vm = this;
      let formData = new FormData();
      formData.append("nik", this.nik);
      formData.append("password", this.password);
      axios({
        method: "POST",
        url: `${process.env.VUE_APP_API_HELPDESK}/sso/user/login`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          if (response.data.info == "sukses") {
            console.log(response.data);
            vm.checkUserNist();
          } else {
            console.log("gagal");
            vm.text="Tidak Terdaftar Di user Info";
            vm.loading=false;
            vm.snackbar=true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      return;
    },
    checkUserNist() {
      let vm = this;
      let id = this.nik;
      console.log(id);
      let options = {
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/user/auth/${id}`,
      };

      axios
        .request(options)
        .then(function (response) {
          if (response.status == "200") {
            let user = response.data[0];
            console.log(response);
            vm.saveUser(user);
          }
        })
        .catch(function (error) {
          console.error(error);
          vm.text="Tidak Terdaftar Di user NIST";
          vm.loading=false;
          vm.snackbar=true;
        });
    },
    saveUser(user) {
      let data = JSON.stringify(user);
      this.$store.commit("setUser", data);
      this.$cookie.set("user", data, "7200");
    },
  },
};
</script>

<style></style>
