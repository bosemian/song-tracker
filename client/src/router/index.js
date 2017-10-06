import Vue from 'vue'
import Router from 'vue-router'

const Hello = () => import('@/components/Hello')
const Register = () => import('@/components/Auth/FormRegister')
const Login = () => import('@/components/Auth/FormLogin')
const Songs = () => import('@/components/Songs/Songs')
const CreateSong = () => import('@/components/Songs/CreateSong')
const ViewSong = () => import('@/components/Songs/ViewSong')

Vue.use(Router)

const router = new Router({
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
      component: Songs,
      children: [

      ]
    },
    {
      path: '/songs/create',
      name: 'songs-create',
      component: CreateSong,
      meta: { requiresAuth: true }
    },
    {
      path: '/songs/:id',
      name: 'view-song',
      component: ViewSong
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(x => x.meta.requiresAuth)) {
    console.log('work')
    if (!localStorage.getItem('token')) {
      next({ path: '/login', query: { redirect: to.fullPath } })
      return
    }
  }
  next()
})

export default router
