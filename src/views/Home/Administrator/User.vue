<template>
  <div class="container">
    <h1 class="mb-4">Daftar User</h1>
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
            <download-excel :data="users" name="users.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="users" type="csv" name="users.csv">
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
    <user-table v-bind:users="users" v-bind:tableloading="tableloading" />
    <user-form
      ref="userForm"
      @edit-user="editUser"
      @add-user="addUser"
      @del-user="deleteUser"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import UserTable from "./UserTable.vue";
import UserForm from "./UserForm.vue";

export default {
  name: "User",
  components: {
    UserTable,
    UserForm
  },
  data() {
    return {
      users: [],
      i_entry:null,
      tableloading:true,
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.userForm.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.userForm.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.userForm.openDialogDelete(data);
    },
    editUser(id, user) {
      let it = this;
      let data = {
        i_emp: user.i_emp,
        n_emp: user.n_emp,
        c_org_cur: user.c_org_cur,
        i_emp_email: user.i_emp_email,
        i_update: this.i_entry,
        i_profl:JSON.stringify(user.i_profl)
      };
      console.log(qs.stringify(data));
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/user`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateUser();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addUser(user) {
      let it = this;
      let formData = new FormData();
      formData.append("i_emp", user.i_emp);
      formData.append("n_emp", user.n_emp);
      formData.append("i_emp_email", user.i_emp_email);
      formData.append("c_org_cur", user.c_org_cur);
      formData.append("i_profl",JSON.stringify(user.i_profl));
      formData.append("i_entry", this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/user`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      let response = axios
        .request(options)
        .then(function (response) {
          if(response.status=='200'){
            it.populateUser();  
            return response;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
      console.log(response);
    },
    deleteUser(id) {
      let it = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/user`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateUser();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async populateUser() {
      var self = this;
      this.tableloading=true;
      await axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/user`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;            
            self.users = data;
            self.tableloading=false;
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
    let user = JSON.parse( this.$store.getters.user);
    this.i_entry =  user.i_user;
    this.populateUser();
  },
};
</script>

<style>
#user {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>