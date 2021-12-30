<template>
  <v-card id="DatastoreTable">
    <v-data-table
      :headers="headers"
      :items="datastores"
      :loading="loading"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editDs(item)"  v-if="menuauth.f_edit=='1'">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteDs(item)"  v-if="menuauth.f_delete=='1'">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  export default {
    name: 'datastore-table',
    props:{
        menuauth:Object,
        datastores: Array,
        loading: Boolean,
    },
    data(){
      return {
        datastoreId:null,
        headers:[
          { text: 'Nama', value: 'n_stor_ds',align: 'start' },
          { text: 'Size (TB)', value: 'q_stor_ds' },
          { text: 'Cluster', value: 'n_server_clu' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editDs(datastore){
        let data = Object.assign({},datastore)
        console.log(data);
        this.$parent.openEditDialog(data);
      },
      deleteDs(datastore){
        let data = Object.assign({},datastore)
        this.$parent.openDeleteDialog(data);
      },
    }
  }
</script>