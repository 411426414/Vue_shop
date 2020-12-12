import Vue from 'vue'
import VueRouter from 'vue-router'
import Add from '../components/goods/Add.vue'
import Cate from '../components/goods/Cate.vue'
import GoodsList from '../components/goods/List.vue'
import Params from '../components/goods/Params.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Orders from '../components/order/Order.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Report from '../components/report/Report.vue'
import Users from '../components/user/Users.vue'
import Welcome from '../components/Welcome.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    /* 路由重定向 */
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList },
        { path: '/goods/add', component: Add },
        { path: '/orders', component: Orders },
        { path: '/report', component: Report }
      ]
    }
  ]
})

// 挂载路由导航守卫
//  to将要访问的路径
//  from代表从哪个路径跳转而来
//  next是一个函数，表示放行
//      next() 放行   next(' /login')强制跳转
router.beforeEach((to, from, next) => {
  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next()
  // 从sessionStorage中获取到保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，，强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router