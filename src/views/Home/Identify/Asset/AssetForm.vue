<template>
  <div class="asset-form">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5"> {{this.title}} </v-card-title>
        <v-card-text>
        <form v-on:submit.prevent="submit">
          <div class="mb-3">
            <label for="name" class="form-label">Nama</label>
            <input
              type="text"
              class="form-control"
              placeholder="Masukkan nama asset"
              v-model="asset.nama"
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Serial Number</label>
            <input
              type="text"
              class="form-control"
              placeholder="Masukkan SN"
              v-model="asset.sn"
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">No Inventaris</label>
            <input
              type="text"
              class="form-control"
              placeholder="Masukkan no inventaris"
              v-model="asset.inv"
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Model</label>
            <input
              type="text"
              class="form-control"
              placeholder="Masukkan model"
              v-model="asset.model"
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Lokasi</label>
            <input
              type="text"
              class="form-control"
              placeholder="Masukkan lokasi"
              v-model="asset.lokasi"
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Keterangan</label>
            <textarea
              type="text"
              class="form-control"
              placeholder="Masukkan keterangan"
              v-model="asset.keterangan"
            >
            </textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="green" rounded
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "asset-add",
  data() {
    return {
      snackbar: false,
      text:'',
      timeout:2000,
      type: 'add',
      title: "FORMULIR TAMBAH ASSET",
      dialog: false,
      asset: {
        id: "",
        nama: "",
        sn: "",
        inv: "",
        model: "",
        lokasi: "",
        keterangan: "",
      },
    };
  },

  methods: {
    submit() {
      switch (this.type) {
        case "edit":
          this.snackbar = true
          this.text = "Succesfull updating asset"
          this.$emit('edit-asset', this.asset.id, this.asset)
          this.dialog = false;
          break;
      
        default:
          this.snackbar = true
          this.text = "Succesfull adding  asset"
          this.$emit("add-asset", this.asset);
          this.asset = {
            nama: "",
            sn: "",
            inv: "",
            model: "",
            lokasi: "",
            keterangan: "",
          };
          this.dialog = false;
      }
      
    },
    openDialogAdd(){
      this.dialog = true
      this.title = "FORM ADD ASSET"
      this.type = "add"
    },
    openDialogEdit(data){
      this.dialog = true;
      this.asset = data;
      this.title = "FORM EDIT ASSET"
      this.type = "edit"
    }
  },
};
</script>