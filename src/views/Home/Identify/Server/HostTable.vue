<template>
  <div id="HostTable">
    <v-data-table
      :headers="headers"
      :items="hosts">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editHost(item)">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteHost(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'host-table',
    props:{
        hosts: Array,
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