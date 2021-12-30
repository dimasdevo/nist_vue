<template>
  <v-card id="VolumeTable">
    <v-data-table
      :headers="headers"
      :items="volumes"
      :loading="loading"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editVol(item)" v-if="menuauth.f_edit=='1'">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteVol(item)" v-if="menuauth.f_delete=='1'">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  export default {
    name: 'volume-table',
    props:{
        menuauth:Object,
        volumes: Array,
        loading: Boolean
    },
    data(){
      return {
        volumeId:null,
        headers:[
          { text: 'Nama', value: 'n_stor_vol',align: 'start' },
          { text: 'Size (TB)', value: 'q_stor_vol' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editVol(volume){
        let data = Object.assign({},volume)
        console.log(data);
        this.$parent.openEditDialog(data);
      },
      deleteVol(volume){
        let data = Object.assign({},volume)
        this.$parent.openDeleteDialog(data);
      },
    }
  }
</script>