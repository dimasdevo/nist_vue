<template>
  <table class="table">
    <thead class="table-light">
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
        <template v-if="assetId===asset.id">
          <td>
            <label for="name" class="font-weight-bold">Nama:</label>
            <div> 
              <input type="text" v-model="asset.nama" class="form-control" />
            </div>
          </td>
          <td>
            <label for="name" class="font-weight-bold">SN:</label>
            <div> 
              <input type="text" v-model="asset.sn" class="form-control" />
            </div>
          </td>
          <td>
            <label for="name" class="font-weight-bold">No Inventaris:</label>
            <div> 
              <input type="text" v-model="asset.inv" class="form-control" />
            </div>
          </td>
          <td>
            <label for="name" class="font-weight-bold">Model:</label>
            <div> 
              <input type="text" v-model="asset.model" class="form-control" />
            </div>
          </td>
          <td>
            <label for="name" class="font-weight-bold">Lokasi:</label>
            <div> 
              <input type="text" v-model="asset.lokasi" class="form-control" />
            </div>
          </td>
          <td>
            <label for="name" class="font-weight-bold">Keterangan:</label>
            <div> 
              <textarea type="text" v-model="asset.keterangan" class="form-control"></textarea>
            </div>
          </td>
          <td>
            <button class="btn btn-success mr-2" @click="saveEdit(asset)">Save</button>
            <button class="btn btn-danger" @click="cancelEdit(asset)">Cancel</button>
          </td>
        </template>
        <template v-else>
          <td>{{asset.nama}}</td>
          <td>{{asset.sn}}</td>
          <td>{{asset.inv}}</td>
          <td>{{asset.model}}</td>
          <td>{{asset.lokasi}}</td>
          <td>{{asset.keterangan}}</td>
          <td>
            <button class="btn btn-primary" @click="editAsset(asset)">Edit</button>
            <button class="btn btn-danger" @click="deleteAsset(asset.id)">Hapus</button>
          </td>
        </template>
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
        this.assetId = asset.id
      },
      saveEdit(asset){
        let id = this.data.id
        this.$emit('edit-asset',id,asset)
        this.assetId = null
      },
      cancelEdit(asset){
        Object.assign(asset,this.data)
        this.assetId = null
      },
      deleteAsset(id){
        this.$emit('delete-asset',id) 
      }
    }
  }
</script>

<style scoped>

</style>