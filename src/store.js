import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    loggedin:false,    
    token: localStorage.getItem('token') || '',
    user :''
  },
  mutations: {
  	auth_request(state){
    state.status = 'loading'
  },
  auth_success(state, token, user){
    state.status = 'success'
    state.loggedin=true
    state.token = token
    state.user = user
  },
  auth_error(state){
    state.status = 'error'
    state.loggedin=false
  },
  logout(state){
    state.status = ''
    state.token = ''
    state.loggedin=false
  },

  },
  actions: {
  	login({commit}, user){
     
      if (user.email==="admin" && user.pwd==="admin") {

      	const token = Math.random()
        const user = "Admin"
        localStorage.setItem('token', token)
        commit('auth_success', token, user)

      }else{
      	 commit('auth_error')
        localStorage.removeItem('token')

      }
  },
      logout({commit}){
      localStorage.removeItem('token')
      commit('logout')
      delete axios.defaults.headers.common['Authorization']
    }
      
},

  getters : {
  isLoggedIn: state => state.loggedin,
  authStatus: state => state.status,
  }
  })