<template>
  <v-card id="AktivitasTable">
    <v-card-text>
    <v-data-table
      :headers="headers"
      :items="aktivitass"
      :loading="loading"
      :search="search"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="showKegiatan(item)">mdi-eye</v-icon>
      </template>
    </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    name: 'aktivitas-table',
    props:{
      menuauth:Object,
      aktivitass: Array,
      loading: Boolean,
    },
    data(){
      return {
        search: '',
        aktivitasId:null,
        headers:[
          { text: 'ID', value: 'i_lkm_actyorg',align: 'start' },
          { text: 'Nama Aktivitas', value: 'n_lkm_acty' },
          { text: 'Sifat', value: 'c_lkm_actytype' },
          { text: 'Organisasi Tanggung Jawab', value: 'c_org' },
          { text: 'Jumlah', value: 'job_count' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      showKegiatan(aktivitas){
        let data = Object.assign({},aktivitas)
        this.$parent.setAktivitas(data);
      },
    }
  }
</script>