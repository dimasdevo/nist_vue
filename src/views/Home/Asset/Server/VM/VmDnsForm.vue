<template>
  <v-dialog v-model="dialogDNS" width="750">
      <v-card>
        <v-card-title class="text-h5"> {{ this.title }} </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form2" v-model="valid" lazy-validation>
            <v-text-field
              v-model="dns.i_server_ipvm"
              label="IP Address"
              required
            ></v-text-field>
            <v-text-field
              v-model="dns.n_server_vmdomain"
              label="Name Domain"
              required
            ></v-text-field>
            <v-text-field
              v-model="dns.n_server_vmsc"
              label="Layanan"
              required
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit"> Submit </v-btn>
            <v-btn color="yellow" @click="closeDialogDNS"> Cancel </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    
</template>
<script>

export default {
  name: "vmdns-form",
  data: () => ({
    title: "FORMULIR TAMBAH DNS",
    dialogDNS: false,
    valid: true,
    dns:{
      c_server_vmdns:"",
      c_server_vm:"",
      i_server_ipvm:"",
      n_server_vmdomain:"",
      n_server_vmsc:"",
      i_entry:"",
      i_update:"",
    }
  }),
  methods: {
    submit() {
      if (this.$refs.form2.validate()) {
        switch (this.type) {
          case "edit":
            this.$emit("edit-vm-dns", this.dns, this.dns.c_server_vmdns);
            break;
        
          default:
            this.dns.c_server_vmdns=Math.floor(Math.random() * 10000);
            this.$emit("add-vm-dns", this.dns);
            break;
        }
       this.closeDialogDNS();

      }
    },
    openDialogAdd() {
      this.dialogDNS = true;
      this.type = "add";
    },
    openDialogEdit(data) {
      this.dialogDNS = true;
      this.dns = data;
      this.title = "FORM EDIT DNS";
      this.type = "edit";
    },
    closeDialogDNS() {
      this.dns = {
        c_server_vmdns:"",
        c_server_vm:"",
        i_server_ipvm:"",
        n_server_vmdomain:"",
        n_server_vmsc:"",
        i_entry:"",
        i_update:"",
      };
      this.dialogDNS = false;
    },
  },
};
</script>