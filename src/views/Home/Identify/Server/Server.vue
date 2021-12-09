<template>
  <v-card>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="vm.name" label="Name" required></v-text-field>

        <v-text-field v-model="vm.peran" label="Peran" required></v-text-field>

        <v-select
          v-model="vm.klasifikasi"
          :items="klasifikasi_list"
          :rules="[(v) => !!v || 'Item is required']"
          label="Klasifikasi"
          required
        ></v-select>

        <v-text-field v-model="vm.host" label="Host " required></v-text-field>

        <v-select
          v-model="vm.os"
          :items="datastores"
          :rules="[(v) => !!v || 'Item is required']"
          label="DataStore"
          required
        ></v-select>

        <v-select
          v-model="vm.os"
          :items="os_list"
          :rules="[(v) => !!v || 'Item is required']"
          label="Operating System"
          required
        ></v-select>

        <v-spacer></v-spacer>
        <hr />
        <v-btn dark class="ma-1">
          <span>Add</span>
          <v-icon right>mdi-plus</v-icon>
        </v-btn>
        <v-data-table
          :headers="headers"
          :items="apps"
        >
        </v-data-table>
        <v-btn color="primary"> Submit </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import axios from "axios";

export default {
  name: "server",
  data: () => ({
    valid: true,
    vm: {
      name: "",
      peran: "",
      klasifikasi: "",
      host: "",
      datastore: "",
      os: "",
    },
    klasifikasi_list: ["PRODUKSI", "TEST", "DEVELOPMENT"],
    os_list: ["PRODUKSI", "TEST", "DEVELOPMENT"],
    headers:[
      { text: "IP", value: "ip", align: "start" },
      { text: "DOMAIN NAME", value: "dns" },
      { text: "LAYANAN", value: "service" },
    ],
    apps:[
      {
        "ip":"10.1.95.38",
        "dns":"A.*",
        "service":"PORTAL"
      },
       {
        "ip":"10.1.95.38",
        "dns":"A.*",
        "service":"PORTAL"
      }
    ],
    datastores:[]
  }),
  methods: {
    populateDatastore() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/datastore`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.datastores = data.map(obj =>{
              let rObj = {}
              rObj['text'] = obj.n_stor_ds
              rObj['value'] = obj.c_stor_ds
              return rObj;
            });
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted() {
    console.log("Populate");
    this.populateDatastore();
  },
};
</script>