import Vue from 'vue'
import Router from 'vue-router'

const Hello = () => import('@/components/Hello')
const Register = () => import('@/components/Auth/FormRegister')
const Login = () => import('@/components/Auth/FormLogin')
const Songs = () => import('@/components/Songs')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'song',
      component: Songs
    }
  ]
})
