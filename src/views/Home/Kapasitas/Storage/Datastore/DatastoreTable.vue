<template>
  <div id="DatastoreTable">
    <v-data-table
      :headers="headers"
      :items="datastores"
      :loading="loading"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="blue" @click="addDsAccumulate(item)">mdi-chart-areaspline</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'datastore-table',
    props:{
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
      addDsAccumulate(datastore){
        let data = Object.assign({},datastore)
        this.$parent.openAccumulateDialog(data);
      }
    }
  }
</script>