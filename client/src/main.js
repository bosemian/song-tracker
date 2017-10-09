import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'
import VueYouTubeEmbed from 'vue-youtube-embed'

const Alert = () => import('@/components/Shared/Alert')
const TextField = () => import('@/components/Shared/TextField')
const Panel = () => import('@/components/Shared/Panel')

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueYouTubeEmbed)

sync(store, router)

Vue.component('app-alert', Alert)
Vue.component('app-text-field', TextField)
Vue.component('panel', Panel)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
