<template>
  <div class="home">
    <v-row>
      <v-col v-for="item in items" :key="item.id">
        <v-card
          class="mx-auto"
        >
          <v-img
            :src="item.img"
            height="180px"
            width="180px"
            contain
          ></v-img>

          <v-card-title>
            {{item.title}}
          </v-card-title>

          <v-card-subtitle>
            {{item.subtitle}}
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
      </v-col>
      <v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      items:[
        {
          id: 1,
          img: require('/public/images/recruitment.png'),
          title: 'ID-IDENTIFY',
          subtitle: ""
        },
        {
          id: 2,
          img: require('/public/images/data-protection.png'),
          title: 'PR-PROTECT',
          subtitle: ""
        },
        {
          id: 3,
          img: require('/public/images/private-detective.png'),
          title: 'DE-DETECT',
          subtitle: ""
        },
        {
          id: 4,
          img: require('/public/images/reply.png'),
          title: 'RS-RESPOND',
          subtitle: ""
        },
        {
          id: 5,
          img: require('/public/images/strategy.png'),
          title: 'RC-RECOVER',
          subtitle: ""
        }
      ]
    }
  }
};
</script>
