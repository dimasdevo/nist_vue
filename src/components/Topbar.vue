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
       <v-menu offset-y close-on-content-click>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-bind="attrs" v-on="on">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{user.n_emp}}</v-list-item-title>
              <v-list-item-subtitle>{{user.i_user}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="refresh">
            <v-list-item-icon>
              <v-icon>mdi-cloud-refresh</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
               <v-list-item-title> Refresh</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="signOut">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
               <v-list-item-title> Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
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
import axios from "axios";

export default {
  data() {
    return {
      drawer: false,
      display: true,
      items: [],
      user:[],
      favourite:[],
      items2: [],
      offset: true,
    };
  },
  methods: {
    clickDrawer() {
      this.drawer = !this.drawer;
    },
    refresh(){
      this.menuBar();
    },
    signOut(){
      this.$router.go({name:'Login'}) 
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
    },
    menuBar() {
      var self = this;
      let id = this.user.i_user;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/menu/user/${id}`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let menu = response.data;
            self.menuAuth(menu);
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    menuAuth(menu){
      var self = this;
      let id = this.user.i_user;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/menu/usertable/${id}`,
      })
        .then(function (response) {
          if (response.status === 200) {
            let menuauth = response.data;
            self.saveUser(menu, menuauth);
          } else {
            console.log("gagal");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveUser(menu, menuauth) {
      this.items = menu;
      menu = JSON.stringify(menu);
      this.$store.commit("setMenu", menu);
      menuauth = JSON.stringify(menuauth);
      this.$store.commit("setMenuAuth", menuauth);
    },
  },
  mounted() {
    this.user = JSON.parse( this.$store.getters.user);
    this.items = JSON.parse(this.$store.getters.menu);
  },
};
</script>