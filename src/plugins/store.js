import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        user:null
    },
    mutations:{
        setUser(state,payload){
            state.user=payload;
        }
    },
    getters: {
        user(state) {
            return state.user
        }
    }
})

export default store;