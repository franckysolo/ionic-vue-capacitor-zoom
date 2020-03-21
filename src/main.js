import Vue from 'vue'
import App from './App.vue'
import router from './router'
import IonicVue from '@ionic/vue'

import { defineCustomElements } from '@ionic/pwa-elements/loader'

import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'

Vue.use(IonicVue)

Vue.config.productionTip = false
Vue.config.ignoredElements.push(/^ion-/)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

defineCustomElements(window)
