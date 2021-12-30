import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        user:null,
        menu:null,
        menuAuth:null,
    },
    mutations:{
        setUser(state,payload){
            state.user=payload;
            if(payload)
                localStorage.setItem("user",payload);
        },
        setMenu(state,payload){
            state.menu=payload;
            if(payload)
                localStorage.setItem("menu",payload);
        },
        setMenuAuth(state,payload){
            state.menuAuth=payload;
            if(payload)
                localStorage.setItem("menuAuth",payload);
        }
    },
    getters: {
        user(state) {
            if(state.user == null || state.user==undefined){
                if(localStorage.getItem("user"))
                    store.state.user=localStorage.getItem("user");
                else 
                    return null
            }
            return state.user;
        },
        menu(state) {
            if(state.menu == null || state.menu==undefined){
                if(localStorage.getItem("menu"))
                    store.state.menu=localStorage.getItem("menu");
                else 
                    return null
            }
            return state.menu;
        },
        menuAuth(state) {
            if(state.menuAuth == null || state.menuAuth==undefined){
                if(localStorage.getItem("menuAuth"))
                    store.state.menuAuth=localStorage.getItem("menuAuth");
                else 
                    return null
            }
            return state.menuAuth;
        },
    },
    actions:{
        logout({ commit }) {
            localStorage.removeItem("user")
            localStorage.removeItem("menu")
            localStorage.removeItem("menuAuth")
            commit('setUser',null)
            commit('setMenu',null)
            commit('setMenuAuth',null)
        },
    }
})

export default store;