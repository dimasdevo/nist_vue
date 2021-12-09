<template>
  <div id="DatastoreTable">
    <v-data-table
      :headers="headers"
      :items="datastores">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editDs(item)">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteDs(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'datastore-table',
    props:{
        datastores: Array,
    },
    data(){
      return {
        datastoreId:null,
        headers:[
          { text: 'Nama', value: 'n_stor_ds',align: 'start' },
          { text: 'Size (TB)', value: 'q_stor_ds' },
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
      }
    }
  }
</script>