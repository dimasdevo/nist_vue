<template>
  <div>
    <v-app-bar app clipped-left clipped-right dense dark>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="clickDrawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase">
        <span class="font-weight-light">NIST</span>
        <span>management</span>
      </v-app-bar-title>
      <v-spacer> </v-spacer>
      {{user.n_emp}}
      <v-btn text color="grey" @click="signOut">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" clipped app dark width="350">
      <v-card class="mx-auto" tile>
        <v-list
          shaped
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
            <div 
            v-for="child in item.items" 
            :key="child.id">
              <v-list-item v-if="child.items.length==0" :key="child.id" router :to="child.link">
                <v-list-item-icon>
                  <v-icon>
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="child.title" ></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon @click="addFavourite(child, item)">
                    mdi-star-outline
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-list-group 
                v-else
                no-action
                sub-group>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="child.title"></v-list-item-title>
                  </v-list-item-content>
                </template>
                <div>
                  <v-list-item
                    v-for="grandchild in child.items"
                    :key="grandchild.id"
                    router :to="grandchild.link"
                  >
                    <v-list-item-icon>
                      <v-icon ></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="grandchild.title"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon @click="addFavourite(grandchild, item)">
                        mdi-star-outline
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </div>
              </v-list-group>
            </div>
          </v-list-group>
          <v-list-item v-else router :to="item.link">
            <v-list-item-icon>
              <v-icon >{{item.action}}</v-icon>
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
export default {
  data() {
    return {
      drawer: false,
      items: [],
      user:[],
      favourite:[],
      items2: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
      ],
      offset: true,
    };
  },
  methods: {
    clickDrawer() {
      this.drawer = !this.drawer;
    },
    signOut(){
      this.$store.dispatch('logout')
    },
    addFavourite(child, parent){
      if(parent.title!="Favourite"){
        this.items.forEach(element => {
        if(element.title=="Favourite"){
          let item = element.items.filter(function(host){
             return host.id == child.id;
          });
          if(item.length==0){
            if(element.items){
              element.items.push(child);
            }
            else{
              element.items=[];
              element.items.push(child);
            }
          }
        }
        });
      }else{
        parent.items = parent.items.filter(function (host) {
          return host.id !== child.id;
        });
      }
      let menu = JSON.stringify(this.items);
      this.$store.commit("setMenu", menu);
    }    
  },
  mounted() {
    this.user = JSON.parse( this.$store.getters.user);
    this.items = JSON.parse(this.$store.getters.menu);
  },
};
</script>