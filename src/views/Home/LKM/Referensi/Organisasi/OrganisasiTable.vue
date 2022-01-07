<template>
  <v-card id="OrganisasiTable">
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
      :items="organisasis"
      :loading="loading"
      :search="search"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editOrganisasi(item)"  v-if="menuauth.f_edit=='1'">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteOrganisasi(item)" v-if="menuauth.f_delete=='1'">mdi-delete</v-icon>
      </template>
    </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    name: 'organisasi-table',
    props:{
      menuauth:Object,
      organisasis: Array,
      loading: Boolean,
    },
    data(){
      return {
        search: '',
        organisasiId:null,
        headers:[
          { text: 'Kode Organisasi Induk', value: 'c_org_parent' },
          { text: 'Kode Organisasi', value: 'c_org' },
          { text: 'Kode Tanggung Jawab', value: 'c_lkm_resp' },
          { text: 'Nama Tanggung Jawab', value: 'n_lkm_resp' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editOrganisasi(organisasi){
        let data = Object.assign({},organisasi)
        console.log(data);
        this.$parent.openEditDialog(data);
      },
      deleteOrganisasi(organisasi){
        let data = Object.assign({},organisasi)
        this.$parent.openDeleteDialog(data);
      }
    }
  }
</script>