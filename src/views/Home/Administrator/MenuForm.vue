<template>
 <div class="menu-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-select
                v-model="menu_obj.i_menu_root"
                :items="roots"
                :rules="[(v) => !!v || 'Item is required']"
                v-on:change="updateView"
                label="Parent Menu"
                required
            ></v-select>
              <v-text-field
                label="Menu Name"
                placeholder="Input menu name"
                v-model="menu_obj.n_menu"
                filled
              >
              </v-text-field>
              <v-text-field
                label="Menu Link"
                placeholder="Input menu link"
                v-model="menu_obj.i_menu_link"
                filled
              >
              </v-text-field>
              <v-text-field
                label="Menu Icon"
                placeholder="Input menu icon code"
                v-model="menu_obj.i_menu_icon"
                filled
              >
              </v-text-field>
              <v-select
                v-model="menu_obj.c_menu_type"
                :items="items"
                :rules="[(v) => !!v || 'Item is required']"
                label="Tipe Menu"
                required
              ></v-select>

              <v-text-field
                label="Menu Level"
                placeholder="Input menu level"
                v-model="menu_obj.i_menu_lvl"
                filled
              >
              </v-text-field>

              <v-text-field
                label="Menu Order"
                placeholder="Input menu order"
                v-model="menu_obj.i_menu_ord"
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{menu_obj.n_menu}}?</v-card-title>
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
  name: "menu-form",
  data() {
    return {
      snackbar: false,
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH FORMULIR",
      dialog: false,
      dialogDelete: false,
      valid: true,
      menus:[],
      menu_obj:{
        i_menu: "",
        n_menu: "",
        i_menu_link: "-",
        i_menu_icon: "-",
        i_menu_root: "-",
        i_menu_lvl: "-",
        i_menu_ord: "1",
        c_menu_type: "-",
        i_entry:"",
        i_update:""
      },
      items:[{"value":"T","text":"TRANSAKSI"},
             {"value":"N","text":"NON TRANSAKSI"}],
      roots:[]
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating menu";
            this.$emit("edit-menu", this.menu_obj.i_menu, this.menu_obj);
            break;

          default:
            this.text = "Succesfull adding  menu";
            this.$emit("add-menu", this.menu_obj);
            break;
        }
        this.clearData();
      }
    },
    updateView(){
      if(this.menu_obj.i_menu_root=='-'){
        this.menu_obj.i_menu_lvl='1';
        let obj_root = this.menus.filter((element)=>{return element.i_menu_root==this.menu_obj.i_menu_root});
        let obj_max = obj_root.sort().reverse()[0];
        this.menu_obj.i_menu_ord =  parseInt(obj_max.i_menu_ord)+1;
        
      }else{
        let obj_root = this.menus.filter((element)=>{return element.i_menu==this.menu_obj.i_menu_root});
        let obj_child = this.menus.filter((element)=>{return element.i_menu_root==this.menu_obj.i_menu_root});
        console.log(obj_root);
        console.log(obj_child);
        if(obj_child.length<1){
          let obj_max = obj_root[0];
          this.menu_obj.i_menu_lvl = parseInt(obj_max.i_menu_lvl)+1;
          let split_lvl =  obj_max.i_menu_ord.split(".");
          split_lvl.push("1");
          this.menu_obj.i_menu_ord= split_lvl.join('.');
        }else{
          let obj_max_child = obj_child.sort().reverse()[0];
          let obj_max = obj_root[0];
          this.menu_obj.i_menu_lvl = parseInt(obj_max.i_menu_lvl)+1;
          let split_lvl =  obj_max_child.i_menu_ord.split(".");
          let split_index = split_lvl.length-1;
          split_lvl[split_index] = parseInt(split_lvl[split_index])+1;
          this.menu_obj.i_menu_ord= split_lvl.join('.');
        }
      }
    },
    deleteItemConfirm(){
      this.snackbar = true;
      this.text = "Succesfull deleting menu";
      this.$emit("del-menu", this.menu_obj.i_menu);
      this.clearData();
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.menu_obj = {
        i_menu: "",
        n_menu: "",
        i_menu_link: "-",
        i_menu_icon: "-",
        i_menu_root: "-",
        i_menu_lvl: "1",
        i_menu_ord: "1",
        c_menu_type: "-",
        i_entry:"",
        i_update:""
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD MENU";
      this.type = "add";
      this.populateRoots();
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.menu_obj = data;
      this.title = "FORM EDIT MENU";
      this.type = "edit";
      this.populateRoots();
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.menu_obj = data;
      this.type = "delete";
    },
    async populateRoots() {
      var self = this;
      await axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/menu`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;  
            self.menus = data;          
            self.roots = data.filter((obj)=>{
              if(obj.i_menu_lvl<=2){
                return obj;
              }
            });
            self.roots = self.roots.map((obj)=>{
              let rObj = {};
              rObj["text"] = obj.n_menu+' ('+obj.i_menu_root+')';
              rObj["value"] = obj.i_menu;
              return rObj;
            });
            self.roots.push({
              "text":"No Parent",
              "value":"-",
            })
            console.log(self.roots)
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