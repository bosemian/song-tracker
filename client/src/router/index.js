import Vue from 'vue'
import Router from 'vue-router'

const Hello = () => import('@/components/Hello')
const Register = () => import('@/components/Auth/FormRegister')
const Login = () => import('@/components/Auth/FormLogin')
const Songs = () => import('@/components/Songs/Songs')
const SongCreate = () => import('@/components/Songs/SongCreate')
const SongView = () => import('@/components/Songs/SongView')
const SongEdit = () => import('@/components/Songs/SongEdit')

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
      component: SongCreate,
      meta: { requiresAuth: true }
    },
    {
      path: '/songs/:id',
      name: 'song-view',
      component: SongView
    },
    {
      path: '/songs/:id/edit',
      name: 'song-edit',
      component: SongEdit
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
