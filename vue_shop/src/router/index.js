import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
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
        { path: '/users', component: Users}
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
