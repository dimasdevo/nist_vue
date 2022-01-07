<template>
  <div class="container">
    <h1 class="mb-4">Daftar Aktivitas</h1>
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
            <download-excel :data="aktivitass" name="aktivitass.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="aktivitass" type="csv" name="aktivitass.csv">
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
    <aktivitas-table v-bind:aktivitass="aktivitass" v-bind:menuauth="menuauth" v-bind:loading="loading" />
    <aktivitas-form
      ref="aktivitasform"
      @edit-aktivitas="editAktivitas"
      @add-aktivitas="addAktivitas"
      @del-aktivitas="deleteAktivitas"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import AktivitasTable from "./AktivitasTable.vue";
import AktivitasForm from "./AktivitasForm.vue";

export default {
  name: "Peran-Aktivitas",
  components: {
    AktivitasTable,
    AktivitasForm
  },
  data() {
    return {
      template:null,
      menuauth:{
        f_add:'0',
        f_edit:'0',
        f_delete:'0',
      },
      i_entry:"",
      aktivitass: [],
      loading:false
    };
  },
  methods: {
    openAddDialog() {
      console.log(this.template);
      this.$refs.aktivitasform.openDialogAdd(this.template);
    },
    openEditDialog(data) {
      this.$refs.aktivitasform.openDialogEdit(data, this.template);
    },
    openDeleteDialog(data) {
      this.$refs.aktivitasform.openDialogDelete(data);
    },
    editAktivitas(id, aktivitas) {
      this.loading=true;
      let it = this;
      let data = {
        n_lkm_acty: aktivitas.n_lkm_acty,
        c_lkm_actytype: aktivitas.c_lkm_actytype,
        d_lkm_milstart: aktivitas.d_lkm_milstart,
        d_lkm_milend: aktivitas.d_lkm_milend,
        e_lkm_actytgt: aktivitas.e_lkm_actytgt,
        c_org: JSON.stringify(aktivitas.c_org),
        i_update: this.i_entry
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/lkm/activity`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateAktivitas();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addAktivitas(aktivitas) {
      this.loading=true;
      let it = this;
      let formData = new FormData();
      formData.append("i_lkm_tmpl", aktivitas.i_lkm_tmpl);
      formData.append("n_lkm_acty", aktivitas.n_lkm_acty);
      formData.append("c_lkm_actytype", aktivitas.c_lkm_actytype);
      formData.append("d_lkm_milstart", aktivitas.d_lkm_milstart);
      formData.append("d_lkm_milend", aktivitas.d_lkm_milend);
      formData.append("e_lkm_actytgt", aktivitas.e_lkm_actytgt);
      formData.append("c_org", JSON.stringify(aktivitas.c_org));
      formData.append("i_entry",this.i_entry);
      formData.append("i_update",this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/lkm/activity`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateAktivitas();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteAktivitas(id) {
      this.loading=true;
      let it = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/lkm/activity`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateAktivitas();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateAktivitas() {
      let self = this;
      let options = {
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/lkm/activity/paralel`,
      };

      axios
        .request(options)
        .then((response)=> {
          if (response.status === 200) {
            let data = response.data;
            self.aktivitass = data;
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
    populateAktivitasInit() {
      this.loading = true;
      this.aktivitas = [];
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
            self.populateAktivitas();
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
      this.populateAktivitasInit();
    }
  },
  mounted() {
    let user = JSON.parse( this.$store.getters.user);
    let menuauth = JSON.parse( this.$store.getters.menuAuth);
    this.menuauth = menuauth.filter((element)=>{return element.id=='61'})[0];
    this.i_entry =  user.i_user;
    this.populateAktivitasInit();
  },
};
</script>

<style>
#aktivitas {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>