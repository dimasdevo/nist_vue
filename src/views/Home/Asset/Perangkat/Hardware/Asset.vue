<template>
  <div class="container">
    <h1 class="mb-4">Daftar Perangkat Keras</h1>
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
            <download-excel :data="assets" name="asset.xls"> Export To XLS </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="assets" type="csv" name="asset.csv"> Export To CSV </download-excel>
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
    <asset-table v-bind:assets="assets" v-bind:menuauth="menuauth"/>
    <asset-form
      ref="assetform"
      @edit-asset="editAsset"
      @add-asset="addAsset"
      @del-asset="deleteAsset"
    />
  </div>
</template>
<script>
import AssetForm from "./AssetForm.vue";
import AssetTable from "./AssetTable.vue";

import axios from "axios";
import qs from "qs";
export default {
  name: "Asset",
  components: {
    AssetTable,
    AssetForm,
  },
  data() {
    return {
       menuauth:{
        f_add:'0',
        f_edit:'0',
        f_delete:'0',
      },
      i_entry:"",
      assets: [],
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.assetform.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.assetform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.assetform.openDialogDelete(data);
    },
    editAsset(id, asset) {
      let it = this;
      let data = {
        n_asset: asset.n_asset,
        i_asset_sn: asset.i_asset_sn,
        i_asset_inv: asset.i_asset_inv,
        n_asset_type: asset.n_asset_type,
        a_asset: asset.a_asset,
        e_asset_note: asset.e_asset_note,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/asset`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateAsset();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addAsset(asset) {
      let it = this;
      let formData = new FormData();
      formData.append("n_asset", asset.n_asset);
      formData.append("i_asset_sn", asset.i_asset_sn);
      formData.append("i_asset_inv", asset.i_asset_inv);
      formData.append("n_asset_type", asset.n_asset_type);
      formData.append("a_asset", asset.a_asset);
      formData.append("e_asset_note", asset.e_asset_note);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/asset`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateAsset();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteAsset(id) {
      let it = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/asset`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateAsset();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateAsset() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/asset`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.assets = data;
            console.log(data)
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
    let menuauth = JSON.parse( this.$store.getters.menuAuth);
    this.menuauth = menuauth.filter((element)=>{return element.id=='5'})[0];
    this.i_entry =  user.i_user;
    this.populateAsset();
  },
};
</script>

<style>
#asset {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>