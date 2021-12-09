<template>
  <v-card id="profile-table">
    <v-data-table
      :headers="headers"
      :items="profiles"
      :loading="tableloading"
    >
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editProfile(item)">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteProfile(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  name: "profile-table",
  props:{
      profiles: Array,
      tableloading:Boolean, 
  },
  data() {
    return {
      headers: [
        { text: "Nama", value: "n_profl", align: "start" },
        { text: "Deskripsi", value: "e_profl" },
        { text: "Date Entry", value: "d_entry" },
        { text: "Action", value: "action" },
      ],
    };
  },
  methods: {
    editProfile(profile){
        let data = Object.assign({},profile)
        this.$parent.openEditDialog(data);
      },
    deleteProfile(profile){
      let data = Object.assign({},profile)
      this.$parent.openDeleteDialog(data);
    }
  },  
};
</script>