<template>
  <div class="container">
    <h1 class="mb-4">Rincian Kegiatan</h1>
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
            <download-excel :data="kegiatandetails" name="kegiatandetails.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="kegiatandetails" type="csv" name="kegiatandetails.csv">
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
    <kegiatan-detail-table v-bind:kegiatandetails="kegiatandetails" v-bind:menuauth="menuauth" v-bind:loading="loading" />
    <kegiatan-detail-form
      ref="kegiatandetailform"
      @edit-kegiatan="editKegiatan"
      @add-kegiatan="addKegiatan"
      @del-kegiatan="deleteKegiatan"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import KegiatanDetailTable from "./KegiatanDetailTable.vue";
import KegiatanDetailForm from "./KegiatanDetailForm.vue";

export default {
  name: "Peran-Kegiatan-Detail",
  components: {
    KegiatanDetailTable,
    KegiatanDetailForm
  },
  data() {
    return {
      kegiatan:null,
      menuauth:{
        f_add:'0',
        f_edit:'0',
        f_delete:'0',
      },
      organisasi:['IT2100','IT2200','IT2300','IT2400'],
      i_entry:"",
      kegiatandetails: [],
      loading:false
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.kegiatandetailform.openDialogAdd(this.kegiatan);
    },
    openEditDialog(data) {
      this.$refs.kegiatandetailform.openDialogEdit(data,this.kegiatan);
    },
    openDeleteDialog(data) {
      this.$refs.kegiatandetailform.openDialogDelete(data);
    },
    editKegiatan(id, kegiatandetail) {
      this.loading=true;
      let self = this;
      let data = {
        n_lkm_jobdtl: kegiatandetail.n_lkm_jobdtl,
        d_lkm_milstart: kegiatandetail.d_lkm_milstart,
        d_lkm_milend: kegiatandetail.d_lkm_milend,
        i_lkm_job: kegiatandetail.i_lkm_job,
        e_lkm_jobdtltgt: kegiatandetail.e_lkm_jobdtltgt,
        i_update: this.i_entry
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/lkm/job-detail`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.kegiatandetailform.showSnackBar(1,"Succesfull add rincian kegiatan");
              self.populateKegiatan();
          }else{
            self.$refs.kegiatandetailform.showSnackBar(0,"Failed add rincian kegiatan");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.kegiatandetailform.showSnackBar(0,"Failed add rincian kegiatan");
          self.loading=false;
        });
    },
    addKegiatan(kegiatandetail) {
      this.loading=true;
      let self = this;
      let formData = new FormData();
      formData.append("n_lkm_jobdtl", kegiatandetail.n_lkm_jobdtl);
      formData.append("d_lkm_milstart", kegiatandetail.d_lkm_milstart);
      formData.append("d_lkm_milend", kegiatandetail.d_lkm_milend);
      formData.append("i_lkm_job", kegiatandetail.i_lkm_job);
      formData.append("e_lkm_jobdtltgt", kegiatandetail.e_lkm_jobdtltgt);
      formData.append("i_entry",this.i_entry);
      formData.append("i_update",this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/lkm/job-detail`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.kegiatandetailform.showSnackBar(1,"Succesfull edit rincian kegiatan");
              self.populateKegiatan();
          }else{
            self.$refs.kegiatandetailform.showSnackBar(0,"Failed edit rincian kegiatan");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.kegiatandetailform.showSnackBar(0,"Failed edit rincian kegiatan");
          self.loading=false;
        });
    },
    deleteKegiatan(id) {
      this.loading=true;
      let self = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/lkm/job-detail`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          if(response.status>= 200 && response.status < 400){
              self.$refs.kegiatandetailform.showSnackBar(1,"Succesfull delete rincian kegiatan");
              self.populateKegiatan();
          }else{
            self.$refs.kegiatandetailform.showSnackBar(0,"Failed delete rincian kegiatan");
          }
          self.loading=false;
        })
        .catch(()=> {
          self.$refs.kegiatandetailform.showSnackBar(0,"Failed delete rincian kegiatan");
          self.loading=false;
        });
    },
    populateKegiatan() {
      let self = this;
      let options = {
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/lkm/job-detail/query`,
        params:{i_lkm_job:this.kegiatan.i_lkm_job}
      };

      axios
        .request(options)
        .then((response)=> {
          if (response.status === 200) {
            let data = response.data;
            self.kegiatandetails = data;
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
    setKegiatan(kegiatan){
      this.kegiatan = kegiatan;
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