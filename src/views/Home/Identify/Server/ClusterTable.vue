<template>
  <div id="ClusterTable">
    <v-data-table
      :headers="headers"
      :items="clusters">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editCluster(item)">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteCluster(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'cluster-table',
    props:{
        clusters: Array,
    },
    data(){
      return {
        clusterId:null,
        headers:[
          { text: 'Nama', value: 'n_server_clu',align: 'start' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editCluster(cluster){
        let data = Object.assign({},cluster)
        console.log(data);
        this.$parent.openEditDialog(data);
      },
      deleteCluster(cluster){
        let data = Object.assign({},cluster)
        this.$parent.openDeleteDialog(data);
      }
    }
  }
</script>