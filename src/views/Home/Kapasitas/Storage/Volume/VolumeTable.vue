<template>
  <div id="VolumeTable">
    <v-data-table
      :headers="headers"
      :items="volumes"
      :loading="loading"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="blue" @click="addVolAccumulate(item)">mdi-chart-areaspline</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  export default {
    name: 'volume-table',
    props:{
        volumes: Array,
        loading: Boolean
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
      addVolAccumulate(volume){
        let data = Object.assign({},volume)
        this.$parent.openAccumulateDialog(data);
      }
    }
  }
</script>