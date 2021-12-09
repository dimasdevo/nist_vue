<template>
  <div>
    <v-app-bar app clipped-left clipped-right dense dark>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="clickDrawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase grey--text">
        <span class="font-weight-light">NIST</span>
        <span>management</span>
      </v-app-bar-title>
      <v-spacer> </v-spacer>
      {{user.n_emp}}
      <v-btn text color="grey" @click="signOut">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" clipped app dark>
      <v-card class="mx-auto">
        <v-list
          dense
          nav> 
          <div
          v-for="item in items"
          :key="item.id">
          <v-list-group
            v-if="item.items"
            :key="item.id"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="child in item.items" :key="child.id" router :to="child.link">
              <v-list-item-content>
                <v-list-item-title v-text="child.title" ></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>
                  mdi-star-outline
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else router :to="item.link">
            <v-list-item-icon>
              <v-icon>{{item.action}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.title" ></v-list-item-title>
          </v-list-item>
          </div>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      drawer: false,
      items: [],
      user:[]
    };
  },
  methods: {
    clickDrawer() {
      this.drawer = !this.drawer;
    },
    signOut(){
      this.$store.dispatch('logout')
    },
    async populateBar(id) {
      var self = this;
      await axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/menu/user/${id}`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let data = response.data;
            self.items = data;
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
    let user = JSON.parse( this.$store.getters.user);
    this.user = user;
    this.populateBar(user.i_user);
  },
};
</script>