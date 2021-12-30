<template>
  <v-card id="AggregateAccumulateTable">
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
      :items="aggregateaccs"
      :loading="loading"
      :search="search"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editAggrAcc(item)" v-if="menuauth.f_edit=='1'">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteAggrAcc(item)" v-if="menuauth.f_delete=='1'">mdi-delete</v-icon>
      </template>
    </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    name: 'aggregate-accumulate-table',
    props:{
        menuauth:Object,
        aggregateaccs: Array,
        loading: Boolean
    },
    data(){
      return {
        search: '',
        aggregateId:null,
        headers:[
          { text: 'Year', value: 'd_year' },
          { text: 'Month', value: 'd_month' },
          { text: 'Data (TB)', value: 'q_stor_data' },
          { text: 'Snapshot (TB)', value: 'q_stor_snapshot' },
          { text: 'Replication (TB)', value: 'q_stor_replcn' },
          { text: 'FootPrint (TB)', value: 'q_stor_footprint' },
          { text: 'Used (TB)', value: 'q_stor_used' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editAggrAcc(accumulate){
        let data = Object.assign({},accumulate)
        this.$parent.openEditDialog(data);
      },
      deleteAggrAcc(accumulate){
        let data = Object.assign({},accumulate)
        this.$parent.openDeleteDialog(data);
      }
    }
  }
</script>