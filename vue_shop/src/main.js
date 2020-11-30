import axios from 'axios'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import Vue from 'vue'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 树形表格treeTable实现了layui数据表格的大部分功能，并且在用法上与几乎数据表格一致， 支持懒加载、复选框联动(半选)、拖拽列宽、固定表头等功能。
import TreeTable from 'vue-table-with-tree-grid'
import App from './App.vue'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import './plugins/element.js'
import router from './router'

// 将富文本编辑器，注册为全局可以组件
Vue.use(VueQuillEditor)

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 添加axios的axios.interceptors 拦截器，拦截请求前和请求后
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token') // console.log(config)
  return config // 在最后必须 return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
// 注册全局组件
Vue.component('tree-table', TreeTable)

// 自定义过滤器,优化时间
Vue.filter('dateFormat', function(originval) {
  const dt = new Date(originval)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + 1 + '').padStart(2, '0')
  const hh = (dt.getHours() + 1 + '').padStart(2, '0')
  const mm = (dt.getMinutes() + 1 + '').padStart(2, '0')
  const ss = (dt.getSeconds() + 1 + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
