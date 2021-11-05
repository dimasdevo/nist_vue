<template>
  <nav>
    <v-app-bar light app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase grey--text">
        <span class="font-weight-light">NIST</span>
        <span>manajemen</span>
      </v-app-bar-title>
      <v-spacer> </v-spacer>
      <v-btn flat color="grey">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer"  class="primary">
      <v-card>
        <v-list>
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="child in item.items" :key="child.title">
              <v-list-item-content>
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          action: "mdi-package",
          items: [{ title: "List Asset" }],
          title: "Asset",
        },
        {
          action: "mdi-package",
          items: [{ title: "List Asset" }],
          title: "Asset2",
        },
      ],
    };
  },
};
</script>