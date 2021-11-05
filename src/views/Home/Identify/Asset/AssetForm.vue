<template>
  <div class="asset-form">
    <form v-on:submit.prevent="submit">
      <div class="mb-3">
        <label for="name" class="form-label">Nama</label>
        <input
          type="text"
          class="form-control"
          placeholder="Masukkan nama asset"
          v-model="asset.nama"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Serial Number</label>
        <input type="text" class="form-control" placeholder="Masukkan SN" v-model="asset.sn" />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">No Inventaris</label>
        <input
          type="text"
          class="form-control"
          placeholder="Masukkan no inventaris"
          v-model="asset.inv"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Model</label>
        <input type="text" class="form-control" placeholder="Masukkan model" v-model="asset.model"/>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Lokasi</label>
        <input type="text" class="form-control" placeholder="Masukkan lokasi" v-model="asset.lokasi"/>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Keterangan</label>
        <textarea
          type="text"
          class="form-control"
          placeholder="Masukkan keterangan"
          v-model="asset.keterangan">
        </textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
<script>
    export default {
    name: "asset-form",
    data(){
        return {
            asset:{
                nama:'',
                sn:'',
                inv:'',
                model:'',
                lokasi:'',
                keterangan:''
            }
        }
    },
    methods:{
        submit(){
            this.$emit('add-asset',this.asset);
            this.asset = {
                nama:'',
                sn:'',
                inv:'',
                model:'',
                lokasi:'',
                keterangan:''
            };
        }
    }
    };
</script>