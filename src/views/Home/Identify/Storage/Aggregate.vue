<template>
  <div class="container">
    <h1 class="mb-4">Daftar Aggregate</h1>
    <hr />
    <v-btn dark class="ma-1">
      <span>Import</span>
      <v-icon right>mdi-file-import</v-icon>
    </v-btn>
    <v-menu :rounded="rounded" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark class="ma-1" v-bind="attrs" v-on="on">
          <span>Export</span>
          <v-icon right>mdi-file-export</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="aggregates" name="aggregates.xls">
              Export To XLS
            </download-excel>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <download-excel :data="aggregates" type="csv" name="aggregates.csv">
              Export To CSV
            </download-excel>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-divider vertical></v-divider>
    <v-btn dark class="ma-1">
      <span>Filter</span>
      <v-icon right>mdi-filter</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <v-btn dark @click="openAddDialog" class="ma-1">
      <span>Add</span>
      <v-icon right>mdi-plus</v-icon>
    </v-btn>
    <aggregate-table v-bind:aggregates="aggregates" />
    <aggregate-form
      ref="aggregateform"
      @edit-aggregate="editAggregate"
      @add-aggregate="addAggregate"
      @del-aggregate="deleteAggregate"
    />
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import AggregateTable from "./AggregateTable.vue";
import AggregateForm from "./AggregateForm.vue";

export default {
  name: "Aggregate",
  components: {
    AggregateTable,
    AggregateForm
  },
  data() {
    return {
      aggregates: [],
    };
  },
  methods: {
    openAddDialog() {
      this.$refs.aggregateform.openDialogAdd();
    },
    openEditDialog(data) {
      this.$refs.aggregateform.openDialogEdit(data);
    },
    openDeleteDialog(data) {
      this.$refs.aggregateform.openDialogDelete(data);
    },
    editAggregate(id, aggregate) {
      let it = this;
      let data = {
        n_stor_aggr: aggregate.n_stor_aggr,
        q_stor_aggr: aggregate.q_stor_aggr,
      };
      let options = {
        method: "PUT",
        url: `${process.env.VUE_APP_API_NIST}/storage/aggregate`,
        params: { id: id },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateAggregate();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addAggregate(aggregate) {
      let it = this;
      let formData = new FormData();
      formData.append("n_stor_aggr", aggregate.n_stor_aggr);
      formData.append("q_stor_aggr", aggregate.q_stor_aggr);
      let options = {
        method: "post",
        url: `${process.env.VUE_APP_API_NIST}/storage/aggregate`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateAggregate();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    deleteAggregate(id) {
      let it = this;
      let options = {
        method: "DELETE",
        url: `${process.env.VUE_APP_API_NIST}/storage/aggregate`,
        params: { id: id },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          it.populateAggregate();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    populateAggregate() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/storage/aggregate`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.aggregates = data;
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    console.log("aggregate populate")
    this.populateAggregate();
  },
};
</script>

<style>
#aggregate {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>