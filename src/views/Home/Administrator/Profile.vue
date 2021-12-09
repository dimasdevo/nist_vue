<template>
  <div class="container">
    <h1 class="mb-4">Daftar Profile</h1>
    <hr />
    <v-btn dark class="ma-1">
      <span>Import</span>
      <v-icon right>mdi-file-import</v-icon>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark class="ma-1" v-bind="attrs" v-on="on">
          <span>Export</span>
          <v-icon right>mdi-file-export</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="profiles" name="profiles.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="profiles" type="csv" name="profiles.csv">
              Export To CSV
            </download-excel>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-divider vertical></v-divider>
    <v-btn dark class="ma-1">
      <span>Filter</span>
      <v-icon right>mdi-filter</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <v-btn dark @click="openAddDialog" class="ma-1">
      <span>Add</span>
      <v-icon right>mdi-plus</v-icon>
    </v-btn>
    <profile-table v-bind:profiles="profiles" />
    <profile-form
      ref="profileForm"
      @edit-profile="editProfile"
      @add-profile="addProfile"
      @del-profile="deleteProfile"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import ProfileTable from "./ProfileTable.vue";
import ProfileForm from "./ProfileForm.vue";
export default {
  name: "profile",
  components: {
    ProfileTable,
    ProfileForm
  },
  data() {
    return {
      profiles: [],
      headers: [
        { text: "Nama", value: "n_profl", align: "start" },
        { text: "Deskripsi", value: "e_profl" },
        { text: "Date Entry", value: "d_entry" },
      ],
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.profileForm.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.profileForm.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.profileForm.openDialogDelete(data);
    },
    editProfile(id, profile) {
      let it = this;
      let data = {
        i_emp: profile.i_emp,
        n_emp: profile.n_emp,
        c_org_cur: profile.c_org_cur,
        i_emp_email: profile.i_emp_email,
        i_update: this.i_entry,
        i_profl:JSON.stringify(profile.i_profl)
      };
      console.log(qs.stringify(data));
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/profile`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateProfile();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addProfile(profile) {
      let it = this;
      let formData = new FormData();
      formData.append("i_emp", profile.i_emp);
      formData.append("n_emp", profile.n_emp);
      formData.append("i_emp_email", profile.i_emp_email);
      formData.append("c_org_cur", profile.c_org_cur);
      formData.append("i_profl",JSON.stringify(profile.i_profl));
      formData.append("i_entry", this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/profile`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      let response = axios
        .request(options)
        .then(function (response) {
          if(response.status=='200'){
            it.populateProfile();  
            return response;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
      console.log(response);
    },
    deleteProfile(id) {
      let it = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/profile`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateProfile();
        })
        .catch(function (error) {
          console.error(error);
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
            self.profiles = data;
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
    this.populateProfile();
  },
};
</script>