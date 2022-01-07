<template>
  <v-card id="KegiatanTable">
    <v-card-actions>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-actions>
    <v-card-text>
    <v-data-table
      :headers="headers"
      :items="kegiatans"
      :loading="loading"
      :search="search"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editKegiatan(item)"  v-if="menuauth.f_edit=='1'">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteKegiatan(item)" v-if="menuauth.f_delete=='1'">mdi-delete</v-icon>
      </template>
    </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    name: 'kegiatan-table',
    props:{
      menuauth:Object,
      kegiatans: Array,
      loading: Boolean,
    },
    data(){
      return {
        search: '',
        kegiatanId:null,
        headers:[
          { text: 'ID', value: 'i_lkm_job',align: 'start' },
          { text: 'Nama Kegiatan', value: 'n_lkm_job' },
          { text: 'LKM Mulai', value: 'd_lkm_milstart' },
          { text: 'LKM Akhir', value: 'd_lkm_milend' },
          { text: 'Target', value: 'e_lkm_jobtgt' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editKegiatan(kegiatan){
        let data = Object.assign({},kegiatan)
        this.$parent.openEditDialog(data);
      },
      deleteKegiatan(kegiatan){
        let data = Object.assign({},kegiatan)
        this.$parent.openDeleteDialog(data);
      }
    }
  }
</script>