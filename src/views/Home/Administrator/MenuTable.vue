<template>
  <v-card id="Menu">
    <v-data-table
      :headers="headers"
      :items="menus"
    >
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="green" @click="openMenu(item)">mdi-eye</v-icon>
        <v-icon class="mr-2" color="yellow" @click="editMenu(item)">mdi-pencil</v-icon>
        <v-icon class="mr-2" color="red" @click="deleteMenu(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:[`item.i_menu_root`]="{item}">
        <v-chip
        color="red"
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
export default {
  name: "menu",
  props:{
    menus: Array
  },
  data() {
    return {
      headers: [
        { text: "Level", value: "i_menu_ord" },
        { text: "ID Menu", value: "i_menu" },
        { text: "Nama", value: "n_menu" },
        { text: "Link", value: "i_menu_link" },
        { text: "Icon", value: "i_menu_icon" },
        { text: "Action", value: "action" },
      ],
    };
  },
  methods: {
    editMenu(menu){
        let data = Object.assign({},menu)
        this.$parent.openEditDialog(data);
      },
    deleteMenu(menu){
      let data = Object.assign({},menu)
      this.$parent.openDeleteDialog(data);
    },
    openMenu(menu){
      let data = Object.assign({},menu)
      this.$parent.openMenuDialog(data);
    }
  },
};
</script>