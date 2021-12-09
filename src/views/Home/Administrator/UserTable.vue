<template>
  <div id="UserTable">
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="tableloading">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editUser(item)">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteUser(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: "user-table",
  props:{
        users: Array,
        tableloading:Boolean,
    },
  data() {
    return {
      headers: [
        { text: "ID User", value: "i_user", align: "start" },
        { text: "NIK", value: "i_emp" },
        { text: "Name", value: "n_emp" },
        { text: "Email", value: "i_emp_email" },
        { text: "Date Entry", value: "d_entry" },
        { text: 'Action', value: 'action' },
      ],
    };
  },
  methods: {
    editUser(user){
        let data = Object.assign({},user)
        this.$parent.openEditDialog(data);
      },
    deleteUser(user){
      let data = Object.assign({},user)
      this.$parent.openDeleteDialog(data);
    }
  },
};
</script>