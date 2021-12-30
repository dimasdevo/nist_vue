<template>
  <v-card id="HostTable">
    <v-data-table
      :headers="headers"
      :items="hosts"
      :loading="loading"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editHost(item)"  v-if="menuauth.f_edit=='1'">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteHost(item)" v-if="menuauth.f_delete=='1'">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  export default {
    name: 'host-table',
    props:{
        menuauth:Object,
        hosts: Array,
        loading: Boolean,
    },
    data(){
      return {
        hostId:null,
        headers:[
          { text: 'Nama', value: 'n_server_host',align: 'start' },
          { text: 'IP Host', value: 'i_server_iphost' },
          { text: 'Domain', value: 'n_server_domainhost' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editHost(host){
        let data = Object.assign({},host)
        console.log(data);
        this.$parent.openEditDialog(data);
      },
      deleteHost(host){
        let data = Object.assign({},host)
        this.$parent.openDeleteDialog(data);
      }
    }
  }
</script>