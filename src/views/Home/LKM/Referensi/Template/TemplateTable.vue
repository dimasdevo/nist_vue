<template>
  <v-card id="TemplateTable">
    <v-card-actions>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-actions>
    <v-card-text>
    <v-data-table
      :headers="headers"
      :items="templates"
      :loading="loading"
      :search="search"
      loading-text="Loading... Please wait">
      <template v-slot:[`item.action`]="{item}">
        <v-icon class="mr-2" color="yellow" @click="editTemplate(item)"  v-if="menuauth.f_edit=='1'">mdi-pencil</v-icon>
        <v-icon color="red" @click="deleteTemplate(item)" v-if="menuauth.f_delete=='1'">mdi-delete</v-icon>
      </template>
      <template v-slot:[`item.f_lkm_tmpl`]="{item}">
        <v-chip
          class="ma-2"
          color="green"
          label
          text-color="white"
          v-if="item.f_lkm_tmpl=='1'"
        >
          <v-icon left>
            mdi-checkbox-marked-circle
          </v-icon>
          Active
        </v-chip>
        <v-chip
          class="ma-2"
          color="red"
          label
          text-color="white"
          v-if="item.f_lkm_tmpl=='0'"
        >
          <v-icon left>
            mdi-checkbox-blank-circle-outline
          </v-icon>
          Non Active
        </v-chip>
      </template>
    </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    name: 'template-table',
    props:{
      menuauth:Object,
      templates: Array,
      loading: Boolean,
    },
    data(){
      return {
        search: '',
        templateId:null,
        headers:[
          { text: 'Nama Template', value: 'n_lkm_tmpl' },
          { text: 'Status', value: 'f_lkm_tmpl' },
          { text: 'User Entry', value: 'i_entry' },
          { text: 'User Update', value: 'i_update' },
          { text: 'Action', value: 'action' },
        ]
      }
    },
    methods:{
      editTemplate(template){
        let data = Object.assign({},template)
        this.$parent.openEditDialog(data);
      },
      deleteTemplate(template){
        let data = Object.assign({},template)
        this.$parent.openDeleteDialog(data);
      }
    }
  }
</script>