<template>
  <div class="cluster-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-text-field
                label="Cluster Name"
                placeholder="Input cluster name"
                v-model="cluster.n_server_clu"
                :rules="rules.n_server_clu"
                filled
              >
              </v-text-field>
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{cluster.n_server_clu}}?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="green" rounded>
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
  name: "cluster-add",
  data() {
    return {
      snackbar: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH CLUSTER",
      dialog: false,
      dialogDelete: false,
      cluster: {
        c_server_clu: "",
        n_server_clu: "",
      },
      rules: {
        n_server_clu: [(v) => !!v || "Nama Cluster is required"],
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating cluster";
            this.$emit("edit-cluster", this.cluster.c_server_clu, this.cluster);
            break;

          case "delete":
            this.text = "Succesfull deleting cluster";
            this.$emit("del-cluster", this.cluster.c_server_clu);
            break;

          default:
            this.text = "Succesfull adding  cluster";
            console.log(this.cluster)
            this.$emit("add-cluster", this.cluster);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.text = "Succesfull deleting cluster";
      this.$emit("del-cluster", this.cluster.c_server_clu);
      this.clearData();
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.cluster = {
        c_server_clu:"",
        n_server_clu: "",
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD CLUSTER";
      this.type = "add";
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.cluster = data;
      this.title = "FORM EDIT CLUSTER";
      this.type = "edit";
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.cluster = data;
      this.type = "delete";
    },
  },
};
</script>