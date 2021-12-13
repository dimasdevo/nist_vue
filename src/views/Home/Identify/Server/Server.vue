<template>
<v-card>
    <v-tabs vertical>
      <v-tab > 
        <v-icon left> mdi-account </v-icon>
        Virtual Machine
      </v-tab>
      <v-tab>
        <v-icon left> mdi-lock </v-icon>
        Datastore
      </v-tab>
      <v-tab>
        <v-icon left> mdi-access-point </v-icon>
        Host
      </v-tab>
      <v-tab>
        <v-icon left> mdi-access-point </v-icon>
        Cluster
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <vm/>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <datastore/>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat> 
          <host/>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat> 
          <cluster/>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import Datastore from '../Storage/Datastore.vue';
import Vm from './Vm.vue';
import Cluster from './Cluster.vue';
import Host from './Host.vue';
export default {
  components: { Cluster, Datastore, Host, Vm },
  name: "server",
};
</script>