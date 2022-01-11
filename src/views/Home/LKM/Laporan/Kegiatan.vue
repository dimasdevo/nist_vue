<template>
  <div class="container">
    <h1 class="mb-4">Kegiatan</h1>
    <hr />
    <v-btn dark class="ma-1">
      <span>Import</span>
      <v-icon right>mdi-file-import</v-icon>
    </v-btn>
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
    <v-select
          v-model="e1"
          :items="organisasi"
          menu-props="auto"
          label="Select"
          hide-details
          prepend-icon="mdi-map"
          single-line
        ></v-select>
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
    openAddDialog() {
      this.$refs.kegiatanform.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.kegiatanform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.kegiatanform.openDialogDelete(data);
    },
    editKegiatan(id, kegiatan) {
      this.loading=true;
      let it = this;
      let data = {
        n_server_clu: kegiatan.n_server_clu,
        i_update: this.i_entry
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/server/kegiatan`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateKegiatan();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addKegiatan(kegiatan) {
      this.loading=true;
      let it = this;
      let formData = new FormData();
      console.log(this.i_entry);
      formData.append("n_server_clu", kegiatan.n_server_clu);
      formData.append("i_entry",this.i_entry);
      formData.append("i_update",this.i_entry);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/server/kegiatan`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateKegiatan();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteKegiatan(id) {
      this.loading=true;
      let it = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/server/kegiatan`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateKegiatan();
          self.loading = false;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateKegiatan() {
      this.loading=false;
      this.kegiatans=
      [{
        i_lkm_kegiatan:"1",
        n_lkm_kegiatan:"Implementasi Data warehouse",
      },
      {
        i_lkm_kegiatan:"2",
        n_lkm_kegiatan:"Peningkatan Keamanan Informasi pada DBMS",
      },
      {
        i_lkm_kegiatan:"3",
        n_lkm_kegiatan:"Training dan/atau seminar",
      }]
    },
    refresh(){
      this.populateKegiatan();
    }
  },
  mounted() {
    let user = JSON.parse( this.$store.getters.user);
    let menuauth = JSON.parse( this.$store.getters.menuAuth);
    this.menuauth = menuauth.filter((element)=>{return element.id=='161'})[0];
    this.i_entry =  user.i_user;
    this.populateKegiatan();
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