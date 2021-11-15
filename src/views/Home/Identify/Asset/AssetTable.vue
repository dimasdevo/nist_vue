<template>
  <table class="table">
    <thead class="table-darker-2">
      <tr>
        <th scope="col">Nama</th>
        <th scope="col">Serial Number</th>
        <th scope="col">No Inventaris</th>
        <th scope="col">Model</th>
        <th scope="col">Lokasi</th>
        <th scope="col">Keterangan</th>
        <th scope="col">Tindakan</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="asset in assets" :key="asset.id">
        <td>{{asset.nama}}</td>
        <td>{{asset.sn}}</td>
        <td>{{asset.inv}}</td>
        <td>{{asset.model}}</td>
        <td>{{asset.lokasi}}</td>
        <td>{{asset.keterangan}}</td>
        <td>
          <v-icon class="mr-2" color="yellow" @click="editAsset(asset)">mdi-pencil</v-icon>
          <v-icon color="red" @click="deleteAsset(asset.id)">mdi-delete</v-icon>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'asset-table',
    props:{
        assets: Array
    },
    data(){
      return {
        assetId:null,
      }
    },
    methods:{
      editAsset(asset){
        this.data = Object.assign({},asset)
        this.$parent.openEditDialog(this.data);
      },
      deleteAsset(id){
        this.$emit('delete-asset',id) 
      }
    }
  }
</script>