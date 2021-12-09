<template>
  <v-container>
    <div>
      <v-spacer></v-spacer>
      <v-flex xs3>
        <v-menu
          v-model="dateDialog"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model="selectedDate" label="Date" prepend-icon="mdi-calendar" v-on="on"></v-text-field>
          </template>
          <v-date-picker @change="getResume()" v-model="selectedDate" @input="dateDialog = false"></v-date-picker>
        </v-menu>
      </v-flex>
    </div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th rowspan="2">No</th>
            <th rowspan="2">Server</th>
            <th rowspan="2" class="text-center">Notes</th>
            <th rowspan="2" class="text-center">SATUAN</th>
            <th colspan="3" class="text-center">CAPACITY</th>
          </tr>
          <tr>
            <th rowspan="1" class="text-center">PROVISIONED</th>
            <th rowspan="1" class="text-center">USED</th>
            <th rowspan="1" class="text-center">AVAILABLE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(server,index) in references.servers" :key="index">
            <td>{{ index + 1}}</td>
            <td>{{ server.URAIAN ? server.URAIAN : null }}</td>
            <td class="text-center">{{ '-' }}</td>
            <td class="text-center">{{ 'GB' }}</td>
            <td
              class="text-center"
            >{{ server.PROVISIONED ? (server.PROVISIONED).toFixed(0) : null }}</td>
            <td class="text-center">{{ server.USED ? (server.USED).toFixed(0) : null }}</td>
            <td class="text-center">{{ server.AVAILABLE ? (server.AVAILABLE).toFixed(0) : null }}</td>
          </tr>
        </tbody>
        <thead v-if="references.servers.length > 0">
          <tr class="grey lighten-3"> 
            <th colspan="3" class="text-center">JUMLAH</th>
            <th colspan="1" class="text-center">{{ `GB`}}</th>
            <th
              colspan="1"
              class="text-center"
            >{{ references.servers.length > 0 ? (references.servers.map(x=>x.PROVISIONED).reduce((x,y) => x+y) ).toFixed(0) : null }}</th>
            <th
              colspan="1"
              class="text-center"
            >{{ references.servers.length > 0 ? (references.servers.map(x=>x.USED).reduce((x,y) => x+y) ).toFixed(0) : null }}</th>

            <th
              colspan="1"
              class="text-center"
            >{{ references.servers.length > 0 ? (references.servers.map(x=>x.AVAILABLE).reduce((x,y) => x+y) ).toFixed(0) : null }}</th>

          </tr>
        </thead>
      </template>
    </v-simple-table>
    <v-layout mt-4>
      <v-spacer></v-spacer>
      <download-excel v-if="references.servers.length > 0" :data="references.servers">
        <v-btn @click="download">DOWNLOAD DATA</v-btn>
      </download-excel>

      <div v-else>
          DATA IS NOT AVAILABLE
      </div>

      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  components: {
    
  },
  data() {
    return {
      references: {
        servers: []
      },
      downloadFields: {
        NO: "1",
        URAIAN: "N_HOST_NAME",
        KETERANGAN: "-",
        SATUAN: "GB"
      },
      selectedDate: null,
      dateDialog: false
    };
  },
  computed: {
    theDay() {
      return moment(this.selectedDate).format("YYYYMMDD");
    }
  },
  methods: {
    async getResume() {
      await axios
        .get(
          `${process.env.VUE_APP_API_M}/api/servers/disks/resume?date=${this.theDay}`
        )
        .then(response => {
          this.references.servers = response.data;
        });
    },
    async download() {
      await axios.get(
        `${process.env.VUE_APP_API_M}/api/servers/disks/resume?date=${this.theDay}`
      );
    }
  },

  async created() {}
};
</script>

