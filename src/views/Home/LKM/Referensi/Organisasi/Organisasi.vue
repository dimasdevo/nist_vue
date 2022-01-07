<template>
  <div class="container">
    <h1 class="mb-4">Daftar Peran Organisasi</h1>
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
            <download-excel :data="organisasis" name="organisasis.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="organisasis" type="csv" name="organisasis.csv">
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
    <organisasi-table v-bind:organisasis="organisasis" v-bind:menuauth="menuauth" v-bind:loading="loading" />
    <organisasi-form
      ref="organisasiform"
      @edit-organisasi="editOrganisasi"
      @add-organisasi="addOrganisasi"
      @del-organisasi="deleteOrganisasi"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import OrganisasiTable from "./OrganisasiTable.vue";
import OrganisasiForm from "./OrganisasiForm.vue";

export default {
  name: "Peran-Organisasi",
  components: {
    OrganisasiTable,
    OrganisasiForm
  },
  data() {
    return {
      menuauth:{
        f_add:'0',
        f_edit:'0',
        f_delete:'0',
      },
      template:null,
      i_entry:"",
      organisasis: [],
      loading:false
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.organisasiform.openDialogAdd(this.template);
    },
    openEditDialog(data) {
      this.$refs.organisasiform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.organisasiform.openDialogDelete(data);
    },
    editOrganisasi(id, organisasi) {
      this.loading=true;
      let self = this;
      let data = {
        c_org: organisasi.c_org,
        c_org_parent: organisasi.c_org_parent,
        c_org_type: organisasi.c_org_type,
        c_lkm_resp: organisasi.c_lkm_resp,
        n_lkm_resp: organisasi.n_lkm_resp,
        i_update: this.i_entry
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/lkm/organisasi`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.organisasiform.showSnackBar(1,"Succesfull edit organisasi");
              self.populateOrganisasi();
          }else{
            self.$refs.organisasiform.showSnackBar(0,"Failed edit organisasi");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.organisasiform.showSnackBar(0,"Failed edit organisasi");
          self.loading=false;
        });
    },
    addOrganisasi(organisasi) {
      this.loading=true;
      let self = this;
      let formData = new FormData();
      console.log(this.i_entry);
      formData.append("i_lkm_tmpl", organisasi.i_lkm_tmpl);
      formData.append("c_org", organisasi.c_org);
      formData.append("c_org_parent", organisasi.c_org_parent);
      formData.append("c_org_type", organisasi.c_org_type);
      formData.append("c_lkm_resp", organisasi.c_lkm_resp);
      formData.append("n_lkm_resp", organisasi.n_lkm_resp);
      formData.append("i_entry",this.i_entry);
      formData.append("i_update",this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/lkm/organisasi`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.organisasiform.showSnackBar(1,"Succesfull add organisasi");
              self.populateOrganisasi();
          }else{
            self.$refs.organisasiform.showSnackBar(0,"Failed add organisasi");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.organisasiform.showSnackBar(0,"Failed add organisasi");
          self.loading=false;
        });
    },
    deleteOrganisasi(id) {
      this.loading=true;
      let self = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/lkm/organisasi`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.organisasiform.showSnackBar(1,"Succesfull delete organisasi");
              self.populateOrganisasi();
          }else{
            self.$refs.organisasiform.showSnackBar(0,"Failed delete organisasi");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.organisasiform.showSnackBar(0,"Failed delete organisasi");
          self.loading=false;
        });
    },
    populateOrganisasi() {
      this.aggregates = [];
      let self = this;
      let options = {
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/lkm/organisasi`,
      };

      axios
        .request(options)
        .then((response)=> {
          if (response.status === 200) {
            let data = response.data;
            self.organisasis = data;
            self.loading = false;
          } else {
            console.log("gagal");
          }
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateOrganisasiInit() {
      this.loading = true;
      this.aggregates = [];
      let self = this;
      let options = {
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/lkm/template/active`,
      };

      axios
        .request(options)
        .then((response)=> {
          if (response.status === 200) {
            let data = response.data;
            self.template = data[0];
            self.populateOrganisasi();
          } else {
            console.log("gagal");
          }
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    refresh(){
      this.populateOrganisasiInit();
    }
  },
  mounted() {
    let user = JSON.parse( this.$store.getters.user);
    let menuauth = JSON.parse( this.$store.getters.menuAuth);
    this.menuauth = menuauth.filter((element)=>{return element.id=='61'})[0];
    this.i_entry =  user.i_user;
    this.populateOrganisasiInit();
  },
};
</script>

<style>
#organisasi {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>