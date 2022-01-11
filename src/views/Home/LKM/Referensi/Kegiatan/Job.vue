<template>
    <div>
        <div>
            <v-chip
                v-if="showKegiatan||showRincian"
                class="ma-2"
                close
                color="blue"
                label
                outlined
                @click:close="aktivitas=null;kegiatan=null"
                >
                Aktivitas: {{aktivitas.n_lkm_acty}}
            </v-chip>
            <v-chip
                v-if="showRincian"
                class="ma-2"
                close
                color="red"
                label
                outlined
                @click:close="kegiatan=null"
                >
                Kegiatan: {{kegiatan.n_lkm_job}}
            </v-chip>
        </div>
        <aktivitas
            ref="aktifitasref"
            @set-aktivitas="setAktivitas"
            v-show="showAktivitas"/>
        <kegiatan 
            ref="kegiatanref" 
            v-show="showKegiatan"/>
        <kegiatan-detail
            ref="kegiatandetailref" 
            v-show="showRincian"
        />
            
    </div>
</template>
<script>
import Kegiatan from './Kegiatan.vue'
import Aktivitas from './Aktivitas.vue'
import KegiatanDetail from './KegiatanDetail.vue'

export default {
    name: "Job",  
    components: {
        Aktivitas,
        Kegiatan,
        KegiatanDetail,
    },
    data() {
        return {
            aktivitas:null,
            kegiatan:null
        }
    },
    computed:{
        showAktivitas(){
            let flag =  (this.aktivitas==null)?true:false;
            return flag;
        },
        showKegiatan(){
            let flag =  (this.aktivitas!=null&&this.kegiatan==null)?true:false;
            return flag;
        },
        showRincian(){
            let flag =  (this.kegiatan!=null)?true:false;
            return flag;
        }
    },
    methods: {
        setAktivitas(aktivitas) {
            this.aktivitas=aktivitas;
            this.$refs.kegiatanref.setAktivitas(aktivitas);
            this.$refs.kegiatanref.populateKegiatan();
        },
        setKegiatan(kegiatan) {
            this.kegiatan=kegiatan;
            this.$refs.kegiatandetailref.setKegiatan(kegiatan);
            this.$refs.kegiatandetailref.populateKegiatan();
        },
    }
}
</script>>