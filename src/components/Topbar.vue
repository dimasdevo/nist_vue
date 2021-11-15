<template>
  <div>
    <v-app-bar dense app clipped-left clipped-right>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="clickDrawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase grey--text">
        <span class="font-weight-light">NIST</span>
        <span>manajemen</span>
      </v-app-bar-title>
      <v-spacer> </v-spacer>
      <v-btn text color="grey" @click="signOut">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" clipped app>
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
            <v-list-item v-for="child in item.items" :key="child.title" router :to="child.link">
              <v-list-item-content>
                <v-list-item-title v-text="child.title" ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>
<script>

export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          action: "mdi-package",
          items: [{ title: "Asset Management" , link: "/asset"}],
          title: "ID-IDENTIFY"
        },
      ],
    };
  },
  methods: {
    clickDrawer() {
      this.drawer = !this.drawer;
    },
    signOut(){
      if(this.$cookie.get("auth")){
        this.$store.commit('setUser',null)
      }
    }
  }
};
</script>