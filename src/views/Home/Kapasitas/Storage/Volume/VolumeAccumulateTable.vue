<template>
  <v-card id="VolumeAccumulateTable">
    <v-card-actions>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-actions>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="volumeaccs"
        :loading="loading"
        :search="search"
        loading-text="Loading... Please wait"
      >
        <template v-slot:[`item.action`]="{ item }">
          <v-icon
            class="mr-2"
            color="yellow"
            @click="editVolumeAcc(item)"
            v-if="menuauth.f_edit == '1'"
            >mdi-pencil</v-icon
          >
          <v-icon
            color="red"
            @click="deleteVolumeAcc(item)"
            v-if="menuauth.f_delete == '1'"
            >mdi-delete</v-icon
          >
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "volume-accumulate-table",
  props: {
    menuauth: Object,
    volumeaccs: Array,
    loading: Boolean,
  },
  data() {
    return {
      search: "",
      volumeId: null,
      headers: [
        { text: "Year", value: "d_year" },
        { text: "Month", value: "d_month" },
        { text: "Used (TB)", value: "q_stor_used" },
        { text: "Action", value: "action" },
      ],
    };
  },
  methods: {
    editVolumeAcc(accumulate) {
      let data = Object.assign({}, accumulate);
      this.$parent.openEditDialog(data);
    },
    deleteVolumeAcc(accumulate) {
      let data = Object.assign({}, accumulate);
      this.$parent.openDeleteDialog(data);
    },
  },
};
</script>