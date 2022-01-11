<template>
  <div class="container">
    <h1 class="mb-4">Kegiatan</h1>
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
            <download-excel :data="kegiatans" name="kegiatans.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="kegiatans" type="csv" name="kegiatans.csv">
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
    <v-divider></v-divider>
    <kegiatan-table v-bind:kegiatans="kegiatans" v-bind:menuauth="menuauth" v-bind:loading="loading" />
    <kegiatan-form
      ref="kegiatanform"
      @edit-kegiatan="editKegiatan"
      @add-kegiatan="addKegiatan"
      @del-kegiatan="deleteKegiatan"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import KegiatanTable from "./KegiatanTable.vue";
import KegiatanForm from "./KegiatanForm.vue";

export default {
  name: "Peran-Kegiatan",
  components: {
    KegiatanTable,
    KegiatanForm
  },
  data() {
    return {
      aktivitas:null,
      menuauth:{
        f_add:'0',
        f_edit:'0',
        f_delete:'0',
      },
      organisasi:['IT2100','IT2200','IT2300','IT2400'],
      i_entry:"",
      kegiatans: [],
      loading:false
    };
  },
  methods: {
    setKegiatan(kegiatan){
      this.$parent.setKegiatan(kegiatan);
    },
    openAddDialog() {
      this.$refs.kegiatanform.openDialogAdd(this.aktivitas);
    },
    openEditDialog(data) {
      this.$refs.kegiatanform.openDialogEdit(data,this.aktivitas);
    },
    openDeleteDialog(data) {
      this.$refs.kegiatanform.openDialogDelete(data);
    },
    editKegiatan(id, kegiatan) {
      this.loading=true;
      let self = this;
      let data = {
        n_lkm_job: kegiatan.n_lkm_job,
        d_lkm_milstart: kegiatan.d_lkm_milstart,
        d_lkm_milend: kegiatan.d_lkm_milend,
        i_lkm_actyorg: kegiatan.i_lkm_actyorg,
        e_lkm_jobtgt: kegiatan.e_lkm_jobtgt,
        i_update: this.i_entry
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/lkm/job`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.kegiatanform.showSnackBar(1,"Succesfull edit kegiatan");
              self.populateKegiatan();
          }else{
            self.$refs.kegiatanform.showSnackBar(0,"Failed edit kegiatan");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.kegiatanform.showSnackBar(0,"Failed edit kegiatan");
          self.loading=false;
        });
    },
    addKegiatan(kegiatan) {
      this.loading=true;
      let self = this;
      let formData = new FormData();
      formData.append("n_lkm_job", kegiatan.n_lkm_job);
      formData.append("d_lkm_milstart", kegiatan.d_lkm_milstart);
      formData.append("d_lkm_milend", kegiatan.d_lkm_milend);
      formData.append("i_lkm_actyorg", kegiatan.i_lkm_actyorg);
      formData.append("e_lkm_jobtgt", kegiatan.e_lkm_jobtgt);
      formData.append("i_entry",this.i_entry);
      formData.append("i_update",this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/lkm/job`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.kegiatanform.showSnackBar(1,"Succesfull add kegiatan");
              self.populateKegiatan();
          }else{
            self.$refs.kegiatanform.showSnackBar(0,"Failed add kegiatan");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.kegiatanform.showSnackBar(0,"Failed add kegiatan");
          self.loading=false;
        });
    },
    deleteKegiatan(id) {
      this.loading=true;
      let self = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/lkm/job`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.kegiatanform.showSnackBar(1,"Succesfull delete kegiatan");
              self.populateKegiatan();
          }else{
            self.$refs.kegiatanform.showSnackBar(0,"Failed delete kegiatan");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.kegiatanform.showSnackBar(0,"Failed delete kegiatan");
          self.loading=false;
        });
    },
    populateKegiatan() {
      let self = this;
      let options = {
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/lkm/job/query`,
        params:{i_lkm_actyorg:this.aktivitas.i_lkm_actyorg}
      };

      axios
        .request(options)
        .then((response)=> {
          if (response.status === 200) {
            let data = response.data;
            self.kegiatans = data;
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
    refresh(){
      this.populateKegiatan();
    },
    setAktivitas(aktivitas){
      this.aktivitas = aktivitas;
    }
  },
  mounted() {
    let user = JSON.parse( this.$store.getters.user);
    let menuauth = JSON.parse( this.$store.getters.menuAuth);
    this.menuauth = menuauth.filter((element)=>{return element.id=='61'})[0];
    this.i_entry =  user.i_user;    
  },
};
</script>

<style>
#kegiatan {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>