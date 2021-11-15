<template>
  <v-app>
    <topbar v-if="userIsAuthenticated"/>
    <v-main class="ma-4" v-if="userIsAuthenticated">
      <router-view />
    </v-main>
    <v-main v-if="!userIsAuthenticated">
      <login />
    </v-main>
  </v-app>
</template>

<script>
import Topbar from './components/Topbar.vue';
import Login from './views/Login.vue';

export default {
  components: {Topbar, Login },
  name: 'App',
  computed:{
    user() {
      return this.$store.getters.user;
    },
    userIsAuthenticated(){
      return this.user!==null && this.user !== undefined;
    }
  }
};
</script>
