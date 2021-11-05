<template>
    <div id="asset">
        <div class="container">
            <h1 class="mb-4"> Daftar Asset</h1>
            <hr>
            <p>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAsset" aria-expanded="false" aria-controls="collapseAsset" >
                    Tambah Asset
                </button> 
            </p>

            <asset-table v-bind:assets="assets"/>

            <div class="collapse" id="collapseAsset">
                <div class="card card-body">
                    <h2> Input Data Asset</h2>
                    <hr>
                    <asset-form />
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import AssetForm from './AssetForm.vue'
import AssetTable from './AssetTable.vue'
export default {
    name:'Asset',
    components: {
        AssetTable, 
        AssetForm
    },
    data(){
        return {
            assets:[
            {
                id:'1',
                nama:'1',
                sn:'1',
                inv:'1',
                model:'1',
                lokasi:'1',
                keterangan:'1',
            },
            {
                id:'2',
                nama:'2',
                sn:'2',
                inv:'2',
                model:'2',
                lokasi:'2',
                keterangan:'2',
            },
            ]
        }
    }
}
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