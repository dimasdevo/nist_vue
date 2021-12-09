<template>
  <div id="AggregateTable">
    <v-data-table
      :headers="headers"
      :items="aggregates">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editAggr(item)">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteAggr(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'aggregate-table',
    props:{
        aggregates: Array,
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
        console.log(data);
        this.$parent.openEditDialog(data);
      },
      deleteAggr(aggregate){
        let data = Object.assign({},aggregate)
        this.$parent.openDeleteDialog(data);
      }
    }
  }
</script>