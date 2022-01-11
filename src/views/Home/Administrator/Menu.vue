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
    <div>
      <v-chip
          v-if="getMenu1"
          class="ma-2"
          close
          color="blue"
          label
          outlined
          @click:close="deleteMenuDialog"
          >
          Menu: {{menuid.n_menu}}
      </v-chip>
    </div>
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
      menuid:null,
      menuid2:null,
    };
  },
  computed:{
    getMenu1(){
      return (this.menuid!==null)?1:0;
    },
  },
  methods: {
    openAddDialog() {
      this.$refs.menuForm.openDialogAdd(this.menuid);
    },
    openEditDialog(data) {
      this.$refs.menuForm.openDialogEdit(data, this.menuid);
    },
    openDeleteDialog(data) {
      this.$refs.menuForm.openDialogDelete(data);
    },
    openMenuDialog(menu) {
      this.menuid = menu;
      this.populateMenu();
    },
    deleteMenuDialog(){
      this.menuid=null;
      this.populateMenu()
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
            if(self.menuid == null){
              let parent = data.filter((element)=>{return element.i_menu_root=='-'});
              self.menus = parent;
            }else{
              let child = data.filter((element)=>{return element.i_menu_root==self.menuid.i_menu});
              let grandchild =[];
              child.forEach(element => {
                let temp  = data.filter((el)=>{return el.i_menu_root==element.i_menu});
                temp.forEach(el1 => {
                  grandchild.push(el1);
                });
                grandchild.push(element);
              });
              self.menus = grandchild;
            }
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