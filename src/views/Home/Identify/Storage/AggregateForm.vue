<template>
  <div class="aggregate-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
            <div class="mb-3">
              <v-text-field
                label="Aggregate Name"
                placeholder="Input aggregate name"
                v-model="aggregate.n_stor_aggr"
                :rules="rules.n_stor_aggr"
                filled
              >
              </v-text-field>
            </div>
            <div class="mb-3">
              <v-text-field
                label="Size Aggregate (TB)"
                placeholder="Input aggregate"
                v-model="aggregate.q_stor_aggr"
                type="number"
                :rules="rules.q_stor_aggr"
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
          <v-card-title class="text-h5">Are you sure you want to delete this item {{aggregate.n_stor_aggr}}?</v-card-title>
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
  name: "aggregate-add",
  data() {
    return {
      snackbar: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH AGGREGATE",
      dialog: false,
      dialogDelete: false,
      aggregate: {
        c_stor_aggr:"",
        n_stor_aggr: "",
        q_stor_aggr: "",
        c_stor_lun: "",
      },
      rules: {
        n_stor_aggr: [(v) => !!v || "Nama Aggregate is required"],
        q_stor_aggr: [(v) => !!v || "Size Aggregate is required"],
      },
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating aggregate";
            this.$emit("edit-aggregate", this.aggregate.c_stor_aggr, this.aggregate);
            break;

          case "delete":
            this.text = "Succesfull deleting aggregate";
            this.$emit("del-aggregate", this.aggregate.c_stor_aggr);
            break;

          default:
            this.text = "Succesfull adding  aggregate";
            console.log(this.aggregate)
            this.$emit("add-aggregate", this.aggregate);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.text = "Succesfull deleting aggregate";
      this.$emit("del-aggregate", this.aggregate.c_stor_aggr);
      this.clearData();
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.aggregate = {
        c_stor_aggr:"",
        n_stor_aggr: "",
        q_stor_aggr: "",
      };
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd() {
      this.dialog = true;
      this.title = "FORM ADD AGGREGATE";
      this.type = "add";
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.aggregate = data;
      this.title = "FORM EDIT AGGREGATE";
      this.type = "edit";
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.aggregate = data;
      this.type = "delete";
    },
  },
};
</script>