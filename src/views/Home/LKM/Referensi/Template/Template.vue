<template>
  <div class="container">
    <h1 class="mb-4">Daftar Template</h1>
    <hr />
    <v-menu  offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark class="ma-1" v-bind="attrs" v-on="on">
          <span>Export</span>
          <v-icon right>mdi-file-export</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="templates" name="templates.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="templates" type="csv" name="templates.csv">
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
    <v-btn dark @click="openAddDialog" class="ma-1" v-if="menuauth.f_add=='1'">
      <span>Add</span>
      <v-icon right>mdi-plus</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <v-btn dark @click="refresh" class="ma-1">
      <span>Refresh</span>
      <v-icon right>mdi-cloud-refresh</v-icon>
    </v-btn>
    <template-table v-bind:templates="templates" v-bind:menuauth="menuauth" v-bind:loading="loading" />
    <template-form
      ref="templateform"
      @edit-template="editTemplate"
      @add-template="addTemplate"
      @del-template="deleteTemplate"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import TemplateTable from "./TemplateTable.vue";
import TemplateForm from "./TemplateForm.vue";

export default {
  name: "Peran-Template",
  components: {
    TemplateTable,
    TemplateForm
  },
  data() {
    return {
      menuauth:{
        f_add:'0',
        f_edit:'0',
        f_delete:'0',
      },
      i_entry:"",
      templates: [],
      loading:false
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.templateform.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.templateform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.templateform.openDialogDelete(data);
    },
    editTemplate(id, template) {
      this.loading=true;
      let self = this;
      let data = {
        n_lkm_tmpl: template.n_lkm_tmpl,
        f_lkm_tmpl: template.f_lkm_tmpl,
        i_update: this.i_entry
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/lkm/template`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.templateform.showSnackBar(1,"Succesfull edit template");
              self.populateTemplate();
          }else{
            self.$refs.templateform.showSnackBar(0,"Failed edit template");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.templateform.showSnackBar(0,"Failed edit template");
          self.loading=false;
        });
    },
    addTemplate(template) {
      this.loading=true;
      let self = this;
      let formData = new FormData();
      console.log(this.i_entry);
      formData.append("n_lkm_tmpl", template.n_lkm_tmpl);
      formData.append("f_lkm_tmpl", template.f_lkm_tmpl);
      formData.append("i_entry",this.i_entry);
      formData.append("i_update",this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/lkm/template`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.templateform.showSnackBar(1,"Succesfull add template");
              self.populateTemplate();
          }else{
            self.$refs.templateform.showSnackBar(0,"Failed add template");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.templateform.showSnackBar(0,"Failed add template");
          self.loading=false;
        });
    },
    deleteTemplate(id) {
      this.loading=true;
      let self = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/lkm/template`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.templateform.showSnackBar(1,"Succesfull delete template");
              self.populateTemplate();
          }else{
            self.$refs.templateform.showSnackBar(0,"Failed delete template");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.templateform.showSnackBar(0,"Failed delete template");
          self.loading=false;
        });
    },
    populateTemplate() {
      this.templates = [];
      let self = this;
      let options = {
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/lkm/template`,
      };

      axios
        .request(options)
        .then((response)=> {
          if (response.status === 200) {
            let data = response.data;
            self.templates = data;
            self.loading = false;
          } else {
            console.log("gagal");
          }
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    ,
    refresh(){
      this.populateTemplate();
    }
  },
  mounted() {
    let user = JSON.parse( this.$store.getters.user);
    let menuauth = JSON.parse( this.$store.getters.menuAuth);
    this.menuauth = menuauth.filter((element)=>{return element.id=='201'})[0];
    this.i_entry =  user.i_user;
    this.populateTemplate();
  },
};
</script>

<style>
#template {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>