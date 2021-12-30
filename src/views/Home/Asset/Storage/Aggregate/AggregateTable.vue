<template>
  <v-card id="AggregateTable">
    <v-data-table
      :headers="headers"
      :items="aggregates"
      :loading="loading"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editAggr(item)" v-if="menuauth.f_edit=='1'">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteAggr(item)" v-if="menuauth.f_delete=='1'">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  export default {
    name: 'aggregate-table',
    props:{
        menuauth:Object,
        aggregates: Array,
        loading: Boolean
    },
    data(){
      return {
        aggregateId:null,
        headers:[
          { text: 'Nama', value: 'n_stor_aggr',align: 'start' },
          { text: 'Size (TB)', value: 'q_stor_aggr' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editAggr(aggregate){
        let data = Object.assign({},aggregate)
        this.$parent.openEditDialog(data);
      },
      deleteAggr(aggregate){
        let data = Object.assign({},aggregate)
        this.$parent.openDeleteDialog(data);
      },
    }
  }
</script>