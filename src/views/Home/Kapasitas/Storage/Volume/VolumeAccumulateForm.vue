<template>
  <div class="volume-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-on:submit.prevent="submit" lazy-validation>
          <v-card-text>
             <div class="mb-3">
              <v-text-field
                label="USED (TB)"
                v-model="volumeaccs.q_stor_used"
                type="number"
                :rules="[(v) => (!isNaN(parseFloat(v)) && v >= 0) ||'Item must number']"
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
  name: "volume-accumulate-add",
  data() {
    return {
      snackbar: false,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      text: "",
      color:"green",
      timeout: 2000,
      type: "add",
      title: "FORMULIR TAMBAH VOLUME ACCUMULATE",
      dialog: false,
      dialogDelete: false,
      volumeaccs: {
        i_stor_volacc:"",
        c_stor_vol:"",
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
        let d_month = this.volumeaccs.d_month-1; 
        d.setUTCDate(1);
        d.setUTCMonth(d_month);
        d.setUTCFullYear(this.volumeaccs.d_year);
        let date = d.toISOString().substr(0, 7);
        return date;
      },
      set:function(time){
        let datetime = time;
        this.volumeaccs.d_month = parseInt(datetime.substr(5,2));
        this.volumeaccs.d_year = parseInt(datetime.substr(0,4));
      }
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        switch (this.type) {
          case "edit":
            this.$emit("edit-volume-accumulate", this.volumeaccs.i_stor_volacc, this.volumeaccs);
            break;

         default:
            this.$emit("add-volume-accumulate", this.volumeaccs);
            break;
        }
        this.clearData();
      }
    },
    deleteItemConfirm(){
      this.$emit("del-volume-accumulate", this.volumeaccs.i_stor_volacc);
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
      this.volumeaccs= {
        i_stor_volacc:"",
        c_stor_vol:"",
        q_stor_used: 0,
        d_month:1,
        d_year:2021,
      },
      this.dialog = false;
      this.dialogDelete = false;
    },
    openDialogAdd(data) {
      this.dialog = true;
      this.volumeaccs.c_stor_vol = data.c_stor_vol;
      this.title = "FORM ADD VOLUME ACCUMULATE";
      this.type = "add";
    },
    openDialogEdit(data) {
      this.dialog = true;
      this.volumeaccs = data;
      this.title = "FORM EDIT VOLUME ACCUMULATE";
      this.type = "edit";
    },
    openDialogDelete(data) {
      this.dialogDelete = true;
      this.volumeaccs = data;
      this.type = "delete";
    },
  },
};
</script>