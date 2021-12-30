<template>
  <v-card>
    <v-simple-table 
    fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th colspan=3 class="text-left">
              NAME
            </th>
            <th>
              LINK
            </th>
            <th class="text-center">
              VIEW
            </th>
            <th class="text-center">
              READ
            </th>
            <th class="text-center">
              ADD
            </th>
            <th class="text-center">
              EDIT
            </th>
            <th class="text-center">
              DELETE
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items"
              :key="item.i_menu">
            
            <td colspan=3>
              <span v-for="i in parseInt(item.i_menu_lvl)-1" :key="i">&ensp;&ensp;&ensp;</span>
              ----- {{item.n_menu}}
            </td>
            <td>
              {{item.i_menu_link}}
            </td>
            <td>
              <v-checkbox
                  color="primary"
                  label="VIEW"
                  v-model="selected_view"
                  :value="item.i_menu"
                ></v-checkbox>
            </td>
            <td>
              <v-checkbox
                  color="primary"
                  label="READ"
                  v-model="selected_read"
                  :value="item.i_menu"
                ></v-checkbox>
            </td>
            <td>
              <v-checkbox
                  color="primary"
                  label="ADD"
                  v-model="selected_add"
                  :value="item.i_menu"
                ></v-checkbox>
            </td>
            <td>
              <v-checkbox
                  color="primary"
                  label="EDIT"
                  v-model="selected_edit"
                  :value="item.i_menu"
                ></v-checkbox>
            </td>
            <td>
              <v-checkbox
                  color="primary"
                  label="DELETE"
                  v-model="selected_delete"
                  :value="item.i_menu"
                ></v-checkbox>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    {{selected_read}}
        {{selected_view}}
        {{selected_add}}
        {{selected_edit}}
        {{selected_delete}}
  </v-card>
</template>
<script>
import axios from "axios";

export default {
  name: "test",
  data() {
    return {
      items:[],
      selected_read:["1","2","3"],
      selected_view:["1","2","3"],
      selected_add:["1","2","3"],
      selected_edit:["1","2","3"],
      selected_delete:["1","2","3"],
    };
  },
  methods: {
    populateMenu() {
      var self = this;
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_API_NIST}/menu/all`,
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
  created() {

    this.populateMenu();
  },
};
</script>