<template>
  <div class="datastore-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
             <div class="mb-3">
              <v-text-field
                label="USED (TB)"
                v-model="datastoreaccs.q_stor_used"
                type="number"
                filled                
              >
              </v-text-field>
            </div>
            <div class="mb-3" v-if="type!=='edit'">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date_agg"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date_agg"
                    label="Year-Month"
                    readonly
                    filled
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_agg"
                  type="month"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date_agg)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
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
          <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
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
  name: "datastore-accumulate-add",
  data() {
    return {
      snackbar: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      text: "",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH DATASTORE ACCUMULATE",
      dialog: false,
      dialogDelete: false,
      datastoreaccs: {
        i_stor_dsacc:"",
        c_stor_ds:"",
        q_stor_used: 0,
        d_month:1,
        d_year:2021,
      },
      menu: false,
    };
  },
  computed:{
    date_agg:{
      get:function () {
        let d = new Date();
        d.setMonth(this.datastoreaccs.d_month-1);
        d.setUTCFullYear(this.datastoreaccs.d_year);
        let date = d.toISOString().substr(0, 7);
        return date;
      },
      set:function(time){
        let datetime = time;
        this.datastoreaccs.d_month = parseInt(datetime.substr(5,2));
        this.datastoreaccs.d_year = parseInt(datetime.substr(0,4));
      }
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        switch (this.type) {
          case "edit":
            this.text = "Succesfull updating datastore accumulate";
            this.$emit("edit-datastore-accumulate", this.datastoreaccs.i_stor_dsacc, this.datastoreaccs);
            break;

         default:
            this.text = "Succesfull adding  datastore accumulate";
            this.$emit("add-datastore-accumulate", this.datastoreaccs);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.snackbar = true;
      this.text = "Succesfull deleting datastore accumulate";
      this.$emit("del-datastore-accumulate", this.datastoreaccs.i_stor_dsacc);
      this.clearData();
    },
    closeDelete(){
      this.clearData();
    },
    clearData(){
      this.datastoreaccs= {
        i_stor_dsacc:"",
        c_stor_ds:"",
        q_stor_used: 0,
        d_month:1,
        d_year:2021,
      },
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd(data) {
      this.dialog = true;
      this.datastoreaccs.c_stor_ds = data.c_stor_ds;
      this.title = "FORM ADD DATASTORE ACCUMULATE";
      this.type = "add";
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.datastoreaccs = data;
      this.title = "FORM EDIT DATASTORE ACCUMULATE";
      this.type = "edit";
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.datastoreaccs = data;
      this.type = "delete";
    },
  },
};
</script>