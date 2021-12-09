<template>
  <div id="VolumeTable">
    <v-data-table
      :headers="headers"
      :items="volumes">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editDs(item)">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteDs(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'volume-table',
    props:{
        volumes: Array,
    },
    data(){
      return {
        volumeId:null,
        headers:[
          { text: 'Nama', value: 'n_stor_vol',align: 'start' },
          { text: 'Size (TB)', value: 'q_stor_vol' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editDs(volume){
        let data = Object.assign({},volume)
        console.log(data);
        this.$parent.openEditDialog(data);
      },
      deleteDs(volume){
        let data = Object.assign({},volume)
        this.$parent.openDeleteDialog(data);
      }
    }
  }
</script>