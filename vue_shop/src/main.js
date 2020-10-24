import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import './plugins/element.js'
import router from './router'

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 添加axios的axios.interceptors 拦截器，拦截请求前和请求后
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token') // console.log(config)
  return config // 在最后必须 return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
