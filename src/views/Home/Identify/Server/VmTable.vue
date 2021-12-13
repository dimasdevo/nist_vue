<template>
  <div id="VmTable">
    <v-data-table
      :headers="headers"
      :items="vms">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editVm(item)">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteVm(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'vm-table',
    props:{
        vms: Array,
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
        console.log(data);
        this.$parent.openEditDialog(data);
      },
      deleteVm(vm){
        let data = Object.assign({},vm)
        this.$parent.openDeleteDialog(data);
      }
    }
  }
</script>