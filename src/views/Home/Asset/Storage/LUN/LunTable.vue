<template>
  <v-card id="LunTable">
    <v-data-table
      :headers="headers"
      :items="luns"
      :loading="loading"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editLun(item)" v-if="menuauth.f_edit=='1'">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteLun(item)" v-if="menuauth.f_delete=='1'">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  export default {
    name: 'lun-table',
    props:{
        menuauth:Object,
        luns: Array,
        loading: Boolean
    },
    data(){
      return {
        lunId:null,
        headers:[
          { text: 'Nama', value: 'n_stor_lun',align: 'start' },
          { text: 'Size (TB)', value: 'q_stor_lun' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editLun(lun){
        let data = Object.assign({},lun)
        console.log(data);
        this.$parent.openEditDialog(data);
      },
      deleteLun(lun){
        let data = Object.assign({},lun)
        this.$parent.openDeleteDialog(data);
      },      
    }
  }
</script>