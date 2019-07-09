import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from "axios"
import store from "./store.js"
var port = 5000;
axios.defaults.baseURL = 'http://localhost:'+port+'/test'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // axios,
  store,
  router,
  render:h => h(App)
}).$mount("#app")



