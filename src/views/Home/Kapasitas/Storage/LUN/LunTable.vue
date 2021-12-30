<template>
  <div id="LunTable">
    <v-data-table
      :headers="headers"
      :items="luns"
      :loading="loading"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="blue" @click="addLunAccumulate(item)">mdi-format-columns</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'lun-table',
    props:{
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
      addLunAccumulate(lun){
        let data = Object.assign({},lun)
        this.$parent.openAccumulateDialog(data);
      }
    }
  }
</script>