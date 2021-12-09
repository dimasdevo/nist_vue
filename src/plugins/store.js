import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'vue-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        user:null,
    },
    mutations:{
        setUser(state,payload){
            state.user=payload;
        }
    },
    getters: {
        user(state) {
            if(state.user == null || state.user==undefined){
                if(cookie.get("user"))
                    store.state.user=cookie.get("user");
                else 
                    return null
            }
            return state.user
        }
    },
    actions:{
        logout({ commit }) {
            cookie.delete("user")
            commit('setUser',null)
        },
    }
})

export default store;