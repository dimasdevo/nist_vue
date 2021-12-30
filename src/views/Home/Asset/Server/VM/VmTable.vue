<template>
  <v-card id="VmTable">
    <v-data-table
      :headers="headers"
      :items="vms"
      :loading="loading"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editVm(item)" v-if="menuauth.f_edit=='1'">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteVm(item)" v-if="menuauth.f_delete=='1'">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  export default {
    name: 'vm-table',
    props:{
        menuauth:Object,
        vms: Array,
        loading: Boolean,
    },
    data(){
      return {
        vmId:null,
        headers:[
          { text: 'Nama', value: 'n_server_vm',align: 'start' },
          { text: 'Peran', value: 'e_server_vm'},
          { text: 'Kelas', value: 'n_server_vmcls'},
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editVm(vm){
        let data = Object.assign({},vm)
        this.$parent.openEditDialog(data);
      },
      deleteVm(vm){
        let data = Object.assign({},vm)
        this.$parent.openDeleteDialog(data);
      }
    }
  }
</script>