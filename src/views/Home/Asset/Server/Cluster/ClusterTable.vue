<template>
  <div id="ClusterTable">
    <v-data-table
      :headers="headers"
      :items="clusters"
      :loading="loading"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editCluster(item)"  v-if="menuauth.f_edit=='1'">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteCluster(item)" v-if="menuauth.f_delete=='1'">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'cluster-table',
    props:{
      menuauth:Object,
      clusters: Array,
      loading: Boolean,
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