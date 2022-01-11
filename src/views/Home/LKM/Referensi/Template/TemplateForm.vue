<template>
  <div class="template-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-text-field
                label="Nama Template"
                placeholder="Input template"
                v-model="template.n_lkm_tmpl"
                :rules="rules.n_lkm_tmpl"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-checkbox
                label="Flag Template"
                placeholder="Input flag template"
                v-model="template.f_lkm_tmpl"
                filled
              >
              </v-checkbox>
            </div>
          </v-card-text>
          <v-card-actions>
            <div class="text-center">
              <v-btn class="ma-2" type="submit" depressed color="primary">Submit</v-btn>
              <v-btn class="ma-2" @click="closeDelete">Cancel</v-btn>
            </div>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this item {{template.n_lkm_tmpl}}?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" rounded>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "template-add",
  data() {
    return {
      color:"green",
      snackbar: false,
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH TEMPLATE",
      dialog: false,
      dialogDelete: false,
      template: {
        i_lkm_tmpl:"",
        n_lkm_tmpl:"",
        f_lkm_tmpl:"",
        i_entry:"",
      },
      rules: {
        n_lkm_tmpl: [(v) => (!!v && v.length <= 20)|| "Nama Template is required"],
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        switch (this.type) {
          case "edit":
            this.template.f_lkm_tmpl=(this.template.f_lkm_tmpl===true)?'1':'0';
            this.$emit("edit-template", this.template.i_lkm_tmpl, this.template);
            break;

          default:
            this.template.f_lkm_tmpl=(this.template.f_lkm_tmpl===true)?'1':'0';
            this.$emit("add-template", this.template);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.$emit("del-template", this.template.i_lkm_tmpl);
      this.clearData();
    },
     showSnackBar(succes,text){
      this.color = (succes)?"green":"red";
      this.text = text;
      this.snackbar = true;
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.template = {
        i_lkm_tmpl:"",
        n_lkm_tmpl:"",
        f_lkm_tmpl:"",
        i_entry:"",
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD TEMPLATE";
      this.type = "add";
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.template = data;
      this.title = "FORM EDIT TEMPLATE";
      this.type = "edit";
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.template = data;
      this.type = "delete";
    },
  },
};
</script>