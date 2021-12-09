<template>
  <div id="AssetTable">
    <v-data-table
      :headers="headers"
      :items="assets">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editAsset(item)">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteAsset(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'asset-table',
    props:{
        assets: Array,
    },
    data(){
      return {
        assetId:null,
        headers:[
          { text: 'Nama', value: 'n_asset',align: 'start' },
          { text: 'Serial Number', value: 'i_asset_sn' },
          { text: 'No Inventaris', value: 'i_asset_inv' },
          { text: 'Model', value: 'n_asset_type' },
          { text: 'Lokasi', value: 'a_asset' },
          { text: 'Keterangan', value: 'e_asset_note' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editAsset(asset){
        let data = Object.assign({},asset)
        this.$parent.openEditDialog(data);
      },
      deleteAsset(asset){
        let data = Object.assign({},asset)
        this.$parent.openDeleteDialog(data);
      }
    },
    
  }
</script>