<template>
  <v-card id="AggregateTable">
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="aggregates"
        :loading="loading"
        loading-text="Loading... Please wait">
        <template v-slot:[`item.action`]="{item}">
          <v-icon class="mr-2" color="blue" @click="addAggrAccumulate(item)">mdi-format-columns</v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    name: 'aggregate-table',
    props:{
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
      addAggrAccumulate(aggregate){
        let data = Object.assign({},aggregate)
        this.$parent.openAccumulateDialog(data);
      }
    }
  }
</script>