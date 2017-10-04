import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'

const Alert = () => import('@/components/Shared/Alert')

Vue.config.productionTip = false

Vue.use(Vuetify)

sync(store, router)

Vue.component('app-alert', Alert)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
