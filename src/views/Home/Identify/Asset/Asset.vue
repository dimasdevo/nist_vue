<template>
  <div class="container">
    <h1 class="mb-4">Daftar Asset</h1>
    <hr />
    <v-btn color="primary" class="ma-2" dark @click="openAddDialog">
      Add Asset
    </v-btn>
    <asset-table v-bind:assets="assets" />
    <asset-form ref="assetform" @edit-asset="editAsset" @add-asset="addAsset"/>
  </div>
</template>
<script>
import AssetForm from "./AssetForm.vue";
import AssetTable from "./AssetTable.vue";
export default {
  name: "Asset",
  components: {
    AssetTable,
    AssetForm
  },
  data() {
    return {
      assets: [
        {
          id: "1",
          nama: "1",
          sn: "1",
          inv: "1",
          model: "1",
          lokasi: "1",
          keterangan: "1",
        },
        {
          id: "2",
          nama: "2",
          sn: "2",
          inv: "2",
          model: "2",
          lokasi: "2",
          keterangan: "2",
        },
      ],
    };
  },
  methods:{
    openAddDialog(){
        this.$refs.assetform.openDialogAdd();
    },
    openEditDialog(data){
        this.$refs.assetform.openDialogEdit(data);
    },
    editAsset(id, data) {
      this.assets = this.assets.map(function(asset) { 
          return asset.id === id ? data : asset;
    })},
    addAsset(asset) {
      this.assets.push(asset);
    } 
  }
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