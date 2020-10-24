import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => { 
  // console.log(config) 
  config.headers.Authorization = window.sessionStorage.getItem('token') 
  // 在最后必须 return config 
  return config 
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
