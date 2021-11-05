<template>
  <v-app>
    <topbar/>
    <home/>
  </v-app>
</template>

<script>
import Topbar from './components/Topbar.vue';
import Home from './views/Home/Home.vue';

export default {
  components: {Topbar, Home  },
  name: 'App',
};
</script>
