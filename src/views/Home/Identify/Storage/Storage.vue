<template>
  <v-card>
    <v-tabs vertical>
      <v-tab > 
        <v-icon left> mdi-account </v-icon>
        Datastore
      </v-tab>
      <v-tab>
        <v-icon left> mdi-lock </v-icon>
        LUN
      </v-tab>
      <v-tab>
        <v-icon left> mdi-access-point </v-icon>
        Volume
      </v-tab>
      <v-tab>
        <v-icon left> mdi-access-point </v-icon>
        Aggregate
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <datastore />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <lun/>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat> 
          <volume/>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat> 
          <aggregate />
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import Aggregate from './Aggregate.vue';
import Datastore from './Datastore.vue';
import Lun from './Lun.vue';
import Volume from './Volume.vue';

export default {
  components: { Datastore, Aggregate, Volume, Lun },
  name: "Storage",
};
</script>