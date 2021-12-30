<template>
  <div class="container">
    <h1 class="mb-4">Daftar Menu</h1>
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
            <download-excel :data="menus" name="menus.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="menus" type="csv" name="menus.csv">
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
    <menu-table v-bind:menus="menus" />
    <menu-form
      ref="menuForm"
      @edit-menu="editMenu"
      @add-menu="addMenu"
      @del-menu="deleteMenu"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import MenuTable from "./MenuTable.vue";
import MenuForm from "./MenuForm.vue"; 

export default {
  name: "menu",
  components: {
    MenuTable,
    MenuForm
  },
  data() {
    return {
      i_entry:"",
      menus: [],
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.menuForm.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.menuForm.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.menuForm.openDialogDelete(data);
    },
    editMenu(id, menu) {
      let self = this;
      let data = {
        n_menu: menu.n_menu,
        i_menu_link: menu.i_menu_link,
        i_menu_icon: menu.i_menu_icon,
        i_menu_root: menu.i_menu_root,
        i_menu_ord: menu.i_menu_ord,
        i_menu_lvl: menu.i_menu_lvl,
        c_menu_type: menu.c_menu_type,
        i_update: this.i_entry,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/menu`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(()=>{
          self.populateMenu();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addMenu(menu) {
      let self = this;
      let formData = new FormData();
      formData.append("n_menu", menu.n_menu);
      formData.append("i_menu_link", menu.i_menu_link);
      formData.append("i_menu_icon", menu.i_menu_icon);
      formData.append("i_menu_root", menu.i_menu_root);
      formData.append("i_menu_ord", menu.i_menu_ord);
      formData.append("i_menu_lvl", menu.i_menu_lvl);
      formData.append("c_menu_type", menu.c_menu_type);
      formData.append("i_entry", this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/menu`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(()=> {
          self.populateMenu();  
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteMenu(id) {
      let self = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/menu`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(()=> {
          self.populateMenu();
        })
        .catch(function (error) {
          console.error(error);
        });
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
            self.menus = data;
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
    this.populateMenu();
  },
};
</script>