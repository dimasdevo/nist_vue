<template>
  <v-card id="Menu">
    <v-data-table
      :headers="headers"
      :items="menus"
    >
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editMenu(item)">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteMenu(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:[`item.i_menu_root`]="{item}">
        <v-chip
        :color=red
        dark
        v-if="item.i_menu_root=='-'"
        >
          {{ item.i_menu_root }}
        </v-chip>
        <div v-else>
          {{ item.i_menu_root }}
        </div>
      </template>
      <template v-slot:[`item.i_menu_icon`]="{item}">
        <v-icon>{{ item.i_menu_icon }}</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  name: "menu",
  data() {
    return {
      menus: [],
      headers: [
        { text: "Root", value: "i_menu_root", align: "start" },
        { text: "Nama", value: "n_menu" },
        { text: "Link", value: "i_menu_link" },
        { text: "Icon", value: "i_menu_icon" },
        { text: "Date Entry", value: "d_entry" },
        { text: "Action", value: "action" },
      ],
    };
  },
  methods: {
    async populateMenu() {
      var self = this;
      await axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/menu`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;            
            self.menus = data;
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
    this.populateMenu();
  },
};
</script>